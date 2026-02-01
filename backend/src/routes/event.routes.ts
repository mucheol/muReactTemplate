/**
 * 이벤트 관련 API 라우트 (Prisma 연동)
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
 * 이벤트 데이터 변환
 */
function transformEvent(event: any) {
  return {
    ...event,
    howToParticipate: parseJsonField<string[]>(event.howToParticipate, []),
    benefits: parseJsonField<string[]>(event.benefits, []),
    notes: parseJsonField<string[]>(event.notes, []),
    prizeItems: parseJsonField<any[] | null>(event.prizeItems, null),
    promotionSections: parseJsonField<any[] | null>(event.promotionSections, null),
    quizQuestions: parseJsonField<any[] | null>(event.quizQuestions, null),
    stampLocations: parseJsonField<any[] | null>(event.stampLocations, null),
    timeSaleProducts: parseJsonField<any[] | null>(event.timeSaleProducts, null),
  };
}

/**
 * GET /api/event/events - 이벤트 목록 조회
 */
router.get('/events', async (req, res) => {
  try {
    const { status, category } = req.query;

    let events = await prisma.event.findMany({
      orderBy: { id: 'desc' },
    });

    // 상태 필터링 (진행중/종료)
    if (status === 'ongoing') {
      events = events.filter((event) => {
        const now = new Date();
        return now <= event.endDate;
      });
    } else if (status === 'ended') {
      events = events.filter((event) => {
        const now = new Date();
        return now > event.endDate;
      });
    }

    // 카테고리 필터링
    if (category && category !== 'all') {
      events = events.filter((event) => event.category === category);
    }

    const data = events.map(transformEvent);

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('이벤트 목록 조회 실패:', error);
    res.status(500).json({ success: false, message: '이벤트 목록 조회 실패' });
  }
});

/**
 * GET /api/event/events/:id - 특정 이벤트 조회
 */
router.get('/events/:id', async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ success: false, message: '이벤트를 찾을 수 없습니다' });
    }

    res.json({ success: true, data: transformEvent(event) });
  } catch (error) {
    console.error('이벤트 조회 실패:', error);
    res.status(500).json({ success: false, message: '이벤트 조회 실패' });
  }
});

/**
 * POST /api/event/events - 이벤트 생성
 */
router.post('/events', async (req, res) => {
  try {
    const {
      title, subtitle, thumbnailUrl, category, startDate, endDate,
      content, howToParticipate, benefits, notes, prizeItems, prizeType,
      promotionSections, quizQuestions, stampLocations, timeSaleProducts, timeSaleEndTime
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        subtitle,
        thumbnailUrl,
        category,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        content,
        howToParticipate: howToParticipate ? JSON.stringify(howToParticipate) : null,
        benefits: benefits ? JSON.stringify(benefits) : null,
        notes: notes ? JSON.stringify(notes) : null,
        prizeItems: prizeItems ? JSON.stringify(prizeItems) : null,
        prizeType,
        promotionSections: promotionSections ? JSON.stringify(promotionSections) : null,
        quizQuestions: quizQuestions ? JSON.stringify(quizQuestions) : null,
        stampLocations: stampLocations ? JSON.stringify(stampLocations) : null,
        timeSaleProducts: timeSaleProducts ? JSON.stringify(timeSaleProducts) : null,
        timeSaleEndTime: timeSaleEndTime || null,
      },
    });

    res.status(201).json({ success: true, data: transformEvent(event) });
  } catch (error) {
    console.error('이벤트 생성 실패:', error);
    res.status(500).json({ success: false, message: '이벤트 생성 실패' });
  }
});

/**
 * PUT /api/event/events/:id - 이벤트 수정
 */
router.put('/events/:id', async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    const {
      title, subtitle, thumbnailUrl, category, startDate, endDate,
      content, howToParticipate, benefits, notes, prizeItems, prizeType,
      promotionSections, quizQuestions, stampLocations, timeSaleProducts, timeSaleEndTime
    } = req.body;

    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        subtitle,
        thumbnailUrl,
        category,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        content,
        howToParticipate: howToParticipate ? JSON.stringify(howToParticipate) : undefined,
        benefits: benefits ? JSON.stringify(benefits) : undefined,
        notes: notes ? JSON.stringify(notes) : undefined,
        prizeItems: prizeItems ? JSON.stringify(prizeItems) : undefined,
        prizeType,
        promotionSections: promotionSections ? JSON.stringify(promotionSections) : undefined,
        quizQuestions: quizQuestions ? JSON.stringify(quizQuestions) : undefined,
        stampLocations: stampLocations ? JSON.stringify(stampLocations) : undefined,
        timeSaleProducts: timeSaleProducts ? JSON.stringify(timeSaleProducts) : undefined,
        timeSaleEndTime: timeSaleEndTime,
      },
    });

    res.json({ success: true, data: transformEvent(event) });
  } catch (error) {
    console.error('이벤트 수정 실패:', error);
    res.status(500).json({ success: false, message: '이벤트 수정 실패' });
  }
});

/**
 * DELETE /api/event/events/:id - 이벤트 삭제
 */
router.delete('/events/:id', async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    await prisma.event.delete({ where: { id: eventId } });
    res.json({ success: true, message: '이벤트가 삭제되었습니다' });
  } catch (error) {
    console.error('이벤트 삭제 실패:', error);
    res.status(500).json({ success: false, message: '이벤트 삭제 실패' });
  }
});

/**
 * GET /api/event/categories - 카테고리 목록 조회
 */
router.get('/categories', async (req, res) => {
  try {
    const events = await prisma.event.findMany({ select: { category: true } });
    const categories = ['all', ...new Set(events.map(e => e.category))];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: '카테고리 조회 실패' });
  }
});

export = router;
