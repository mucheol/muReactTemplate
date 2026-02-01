/**
 * 블로그 관련 API 라우트 (Prisma 연동)
 */

import express = require('express');
import prisma from '../lib/prisma';

const router = express.Router();

/**
 * JSON 문자열을 파싱하는 헬퍼 함수
 */
function parseJsonField<T>(jsonStr: string | null, defaultValue: T): T {
  if (!jsonStr) return defaultValue;
  try {
    return JSON.parse(jsonStr);
  } catch {
    return defaultValue;
  }
}

/**
 * GET /api/blog/posts - 포스트 목록 조회
 */
router.get('/posts', async (req, res) => {
  try {
    const { category, tag, search, template } = req.query;

    let posts = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
    });

    // 템플릿 필터
    if (template) {
      const templateNum = Number(template);
      posts = posts.filter(post => post.template === templateNum);
    }

    // 카테고리 필터
    if (category && category !== '전체') {
      posts = posts.filter(post => post.category === category);
    }

    // 태그 필터
    if (tag) {
      posts = posts.filter(post => {
        const tags = parseJsonField<string[]>(post.tags, []);
        return tags.includes(tag as string);
      });
    }

    // 검색
    if (search) {
      const searchLower = (search as string).toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }

    // 응답 데이터 변환 (tags를 배열로)
    const data = posts.map(post => ({
      ...post,
      tags: parseJsonField<string[]>(post.tags, []),
      date: post.date.toISOString().split('T')[0].replace(/-/g, '.'),
    }));

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('포스트 목록 조회 실패:', error);
    res.status(500).json({ success: false, message: '포스트 목록 조회 실패' });
  }
});

/**
 * GET /api/blog/posts/:id - 특정 포스트 조회
 */
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const post = await prisma.blogPost.findUnique({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ success: false, message: '포스트를 찾을 수 없습니다' });
    }

    // 조회수 증가
    await prisma.blogPost.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

    const data = {
      ...post,
      tags: parseJsonField<string[]>(post.tags, []),
      date: post.date.toISOString().split('T')[0].replace(/-/g, '.'),
    };

    res.json({ success: true, data });
  } catch (error) {
    console.error('포스트 조회 실패:', error);
    res.status(500).json({ success: false, message: '포스트 조회 실패' });
  }
});

/**
 * POST /api/blog/posts - 포스트 생성
 */
router.post('/posts', async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, template, author, thumbnail } = req.body;

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        category,
        tags: JSON.stringify(tags || []),
        template: template || 1,
        author,
        thumbnail,
        date: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      data: { ...post, tags: parseJsonField<string[]>(post.tags, []) },
    });
  } catch (error) {
    console.error('포스트 생성 실패:', error);
    res.status(500).json({ success: false, message: '포스트 생성 실패' });
  }
});

/**
 * PUT /api/blog/posts/:id - 포스트 수정
 */
router.put('/posts/:id', async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const { title, excerpt, content, category, tags, template, author, thumbnail } = req.body;

    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        title,
        excerpt,
        content,
        category,
        tags: tags ? JSON.stringify(tags) : undefined,
        template: template !== undefined ? template : undefined,
        author,
        thumbnail,
      },
    });

    res.json({
      success: true,
      data: { ...post, tags: parseJsonField<string[]>(post.tags, []) },
    });
  } catch (error) {
    console.error('포스트 수정 실패:', error);
    res.status(500).json({ success: false, message: '포스트 수정 실패' });
  }
});

/**
 * DELETE /api/blog/posts/:id - 포스트 삭제
 */
router.delete('/posts/:id', async (req, res) => {
  try {
    const postId = Number(req.params.id);
    await prisma.blogPost.delete({ where: { id: postId } });
    res.json({ success: true, message: '포스트가 삭제되었습니다' });
  } catch (error) {
    console.error('포스트 삭제 실패:', error);
    res.status(500).json({ success: false, message: '포스트 삭제 실패' });
  }
});

/**
 * GET /api/blog/categories - 카테고리 목록 조회
 */
router.get('/categories', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ select: { category: true } });
    const categories = ['전체', ...new Set(posts.map(p => p.category))];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: '카테고리 조회 실패' });
  }
});

/**
 * GET /api/blog/tags - 태그 목록 조회
 */
router.get('/tags', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ select: { tags: true } });
    const allTags = posts.flatMap(p => parseJsonField<string[]>(p.tags, []));
    const uniqueTags = [...new Set(allTags)];
    res.json({ success: true, data: uniqueTags });
  } catch (error) {
    res.status(500).json({ success: false, message: '태그 조회 실패' });
  }
});

/**
 * GET /api/blog/popular - 인기 포스트 조회
 */
router.get('/popular', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { views: 'desc' },
      take: 5,
    });

    const data = posts.map(post => ({
      ...post,
      tags: parseJsonField<string[]>(post.tags, []),
      date: post.date.toISOString().split('T')[0].replace(/-/g, '.'),
    }));

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: '인기 포스트 조회 실패' });
  }
});

export = router;
