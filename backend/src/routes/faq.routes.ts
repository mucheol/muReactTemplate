/**
 * FAQ 관련 API 라우트 (Prisma 연동)
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
 * FAQ 데이터 변환
 */
function transformFaq(faq: any) {
  return {
    ...faq,
    tags: parseJsonField<string[]>(faq.tags, []),
  };
}

/**
 * GET /api/faq/items - FAQ 목록 조회
 */
router.get('/items', async (req, res) => {
  try {
    const { category, search } = req.query;

    let faqs = await prisma.faq.findMany({
      orderBy: { id: 'asc' },
    });

    // 카테고리 필터
    if (category && category !== 'all') {
      faqs = faqs.filter(faq => faq.category === category);
    }

    // 검색
    if (search) {
      const searchLower = (search as string).toLowerCase();
      faqs = faqs.filter(faq => {
        const tags = parseJsonField<string[]>(faq.tags, []);
        return (
          faq.question.toLowerCase().includes(searchLower) ||
          faq.answer.toLowerCase().includes(searchLower) ||
          tags.some(t => t.toLowerCase().includes(searchLower))
        );
      });
    }

    const data = faqs.map(transformFaq);

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('FAQ 목록 조회 실패:', error);
    res.status(500).json({ success: false, message: 'FAQ 목록 조회 실패' });
  }
});

/**
 * GET /api/faq/items/:id - 특정 FAQ 조회
 */
router.get('/items/:id', async (req, res) => {
  try {
    const faqId = Number(req.params.id);
    const faq = await prisma.faq.findUnique({ where: { id: faqId } });

    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ를 찾을 수 없습니다' });
    }

    res.json({ success: true, data: transformFaq(faq) });
  } catch (error) {
    console.error('FAQ 조회 실패:', error);
    res.status(500).json({ success: false, message: 'FAQ 조회 실패' });
  }
});

/**
 * POST /api/faq/items - FAQ 생성
 */
router.post('/items', async (req, res) => {
  try {
    const { category, question, answer, tags } = req.body;

    const faq = await prisma.faq.create({
      data: {
        category,
        question,
        answer,
        tags: JSON.stringify(tags || []),
      },
    });

    res.status(201).json({ success: true, data: transformFaq(faq) });
  } catch (error) {
    console.error('FAQ 생성 실패:', error);
    res.status(500).json({ success: false, message: 'FAQ 생성 실패' });
  }
});

/**
 * PUT /api/faq/items/:id - FAQ 수정
 */
router.put('/items/:id', async (req, res) => {
  try {
    const faqId = Number(req.params.id);
    const { category, question, answer, tags } = req.body;

    const faq = await prisma.faq.update({
      where: { id: faqId },
      data: {
        category,
        question,
        answer,
        tags: tags ? JSON.stringify(tags) : undefined,
      },
    });

    res.json({ success: true, data: transformFaq(faq) });
  } catch (error) {
    console.error('FAQ 수정 실패:', error);
    res.status(500).json({ success: false, message: 'FAQ 수정 실패' });
  }
});

/**
 * DELETE /api/faq/items/:id - FAQ 삭제
 */
router.delete('/items/:id', async (req, res) => {
  try {
    const faqId = Number(req.params.id);
    await prisma.faq.delete({ where: { id: faqId } });
    res.json({ success: true, message: 'FAQ가 삭제되었습니다' });
  } catch (error) {
    console.error('FAQ 삭제 실패:', error);
    res.status(500).json({ success: false, message: 'FAQ 삭제 실패' });
  }
});

/**
 * GET /api/faq/categories - 카테고리 목록 조회
 */
router.get('/categories', async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({ select: { category: true } });
    const categories = ['all', ...new Set(faqs.map(f => f.category))];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: '카테고리 조회 실패' });
  }
});

/**
 * GET /api/faq/counts - 카테고리별 FAQ 개수 조회
 */
router.get('/counts', async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({ select: { category: true } });

    const counts: Record<string, number> = { all: faqs.length };
    faqs.forEach(faq => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });

    res.json({ success: true, data: counts });
  } catch (error) {
    res.status(500).json({ success: false, message: '카테고리 개수 조회 실패' });
  }
});

export = router;
