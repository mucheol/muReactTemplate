/**
 * 일회용 Seed API (배포 후 삭제 예정)
 */

import express = require('express');
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * POST /api/seed/run
 * 데이터베이스 시드 실행
 */
router.post('/run', async (req, res) => {
  try {
    // 보안을 위한 간단한 체크 (환경변수로 설정 가능)
    const { secret } = req.body;
    if (secret !== 'seed-data-2024') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    console.log('Starting seed...');

    // 기존 데이터 삭제 (선택사항)
    // await prisma.blogPost.deleteMany({});
    // await prisma.product.deleteMany({});
    // await prisma.event.deleteMany({});

    // 블로그 포스트
    const now = new Date();
    const blogPosts = [
      { title: 'React 19의 새로운 기능', excerpt: 'React 19 주요 기능', content: 'React 19 내용...', category: '기술', tags: JSON.stringify(['React']), date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), views: 1250, author: '김개발' },
      { title: 'TypeScript 5.0 가이드', excerpt: 'TS 5.0 업그레이드', content: 'TypeScript 내용...', category: '기술', tags: JSON.stringify(['TypeScript']), date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), views: 980, author: '이코딩' },
      { title: '효율적인 상태 관리', excerpt: 'React 상태관리', content: '상태관리 내용...', category: '튜토리얼', tags: JSON.stringify(['React']), date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), views: 2100, author: '박프론트' },
    ];

    for (const post of blogPosts) {
      await prisma.blogPost.create({ data: post });
    }

    // 상품
    const products = [
      { name: '프리미엄 코트', description: '따뜻한 겨울 코트', price: 299000, originalPrice: 350000, category: '의류', tags: JSON.stringify(['겨울']), rating: 4.8, reviewCount: 156, stock: 25, isNew: true, isBest: true, brand: '럭셔리' },
      { name: '데님 팬츠', description: '슬림핏 데님', price: 79000, originalPrice: 89000, category: '의류', tags: JSON.stringify(['데님']), rating: 4.5, reviewCount: 89, stock: 120, brand: '데님마스터' },
      { name: '블루투스 이어폰', description: '고음질 무선 이어폰', price: 159000, originalPrice: 199000, category: '전자기기', tags: JSON.stringify(['이어폰']), rating: 4.7, reviewCount: 523, stock: 80, isNew: true, isBest: true, brand: '사운드테크' },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    // 이벤트
    const events = [
      {
        title: '신규 가입 20% 할인',
        subtitle: '첫 구매 특별 혜택',
        category: 'discount',
        startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        content: '신규 가입 고객 20% 할인',
      },
      {
        title: '매일 출석체크',
        subtitle: '출석하고 포인트 받자',
        category: 'attendance',
        startDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        content: '매일 출석하고 포인트 적립',
      },
    ];

    for (const event of events) {
      await prisma.event.create({ data: event });
    }

    res.json({
      success: true,
      message: 'Seed completed',
      data: {
        blogPosts: blogPosts.length,
        products: products.length,
        events: events.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: 'Seed failed', error: String(error) });
  }
});

export = router;
