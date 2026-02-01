/**
 * 예약 API 라우트
 */

import express = require('express');
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/reservation/items
 * 예약 목록 조회
 */
router.get('/items', async (req, res) => {
  try {
    const { status, startDate, endDate, search } = req.query;

    let whereClause: any = {};

    // 상태 필터
    if (status && status !== 'all') {
      whereClause.status = status;
    }

    // 날짜 범위 필터
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) {
        whereClause.date.gte = new Date(startDate as string);
      }
      if (endDate) {
        whereClause.date.lte = new Date(endDate as string);
      }
    }

    // 검색 (고객명, 이메일, 전화번호)
    if (search) {
      whereClause.OR = [
        { customerName: { contains: search as string } },
        { email: { contains: search as string } },
        { phone: { contains: search as string } },
      ];
    }

    const reservations = await prisma.reservation.findMany({
      where: whereClause,
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    });

    // 날짜를 YYYY-MM-DD 형식으로 변환
    const formattedReservations = reservations.map((r) => ({
      ...r,
      date: r.date.toISOString().split('T')[0],
    }));

    res.json({
      success: true,
      count: formattedReservations.length,
      data: formattedReservations,
    });
  } catch (error) {
    console.error('예약 목록 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약 목록을 불러오는데 실패했습니다.',
    });
  }
});

/**
 * GET /api/reservation/items/:id
 * 특정 예약 조회
 */
router.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(id) },
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: '예약을 찾을 수 없습니다.',
      });
    }

    res.json({
      success: true,
      data: {
        ...reservation,
        date: reservation.date.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('예약 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약을 불러오는데 실패했습니다.',
    });
  }
});

/**
 * POST /api/reservation/items
 * 예약 생성
 */
router.post('/items', async (req, res) => {
  try {
    const { customerName, email, phone, date, time, people, status, memo } = req.body;

    // 유효성 검사
    if (!customerName || !date || !time || !people) {
      return res.status(400).json({
        success: false,
        message: '필수 항목을 입력해주세요.',
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        customerName,
        email: email || null,
        phone: phone || null,
        date: new Date(date),
        time,
        people: Number(people),
        status: status || 'pending',
        memo: memo || null,
      },
    });

    res.json({
      success: true,
      data: {
        ...reservation,
        date: reservation.date.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('예약 생성 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약 생성에 실패했습니다.',
    });
  }
});

/**
 * PUT /api/reservation/items/:id
 * 예약 수정
 */
router.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, email, phone, date, time, people, status, memo } = req.body;

    const updateData: any = {};

    if (customerName) updateData.customerName = customerName;
    if (email !== undefined) updateData.email = email || null;
    if (phone !== undefined) updateData.phone = phone || null;
    if (date) updateData.date = new Date(date);
    if (time) updateData.time = time;
    if (people) updateData.people = Number(people);
    if (status) updateData.status = status;
    if (memo !== undefined) updateData.memo = memo || null;

    const reservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.json({
      success: true,
      data: {
        ...reservation,
        date: reservation.date.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('예약 수정 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약 수정에 실패했습니다.',
    });
  }
});

/**
 * DELETE /api/reservation/items/:id
 * 예약 삭제
 */
router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.reservation.delete({
      where: { id: Number(id) },
    });

    res.json({
      success: true,
      message: '예약이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('예약 삭제 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약 삭제에 실패했습니다.',
    });
  }
});

/**
 * GET /api/reservation/lookup
 * 예약 조회 (전화번호 또는 이메일로 검색)
 */
router.get('/lookup', async (req, res) => {
  try {
    const { phone, email } = req.query;

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: '전화번호 또는 이메일을 입력해주세요.',
      });
    }

    const whereClause: any = {};

    if (phone && email) {
      whereClause.OR = [
        { phone: phone as string },
        { email: email as string },
      ];
    } else if (phone) {
      whereClause.phone = phone as string;
    } else if (email) {
      whereClause.email = email as string;
    }

    const reservations = await prisma.reservation.findMany({
      where: whereClause,
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    });

    // 날짜를 YYYY-MM-DD 형식으로 변환
    const formattedReservations = reservations.map((r) => ({
      ...r,
      date: r.date.toISOString().split('T')[0],
    }));

    res.json({
      success: true,
      count: formattedReservations.length,
      data: formattedReservations,
    });
  } catch (error) {
    console.error('예약 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약 조회에 실패했습니다.',
    });
  }
});

/**
 * GET /api/reservation/available-times
 * 특정 날짜의 예약 가능 시간 조회
 */
router.get('/available-times', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: '날짜를 입력해주세요.',
      });
    }

    // 모든 가능한 시간대 (9:00 ~ 21:00, 1시간 단위)
    const allTimes = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
    ];

    // 해당 날짜의 예약 조회
    const reservations = await prisma.reservation.findMany({
      where: {
        date: new Date(date as string),
        status: { in: ['pending', 'confirmed'] },
      },
      select: {
        time: true,
      },
    });

    // 이미 예약된 시간 제외
    const bookedTimes = reservations.map((r) => r.time);
    const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

    res.json({
      success: true,
      data: availableTimes,
    });
  } catch (error) {
    console.error('예약 가능 시간 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '예약 가능 시간 조회에 실패했습니다.',
    });
  }
});

export = router;
