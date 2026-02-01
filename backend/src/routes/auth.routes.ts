/**
 * 인증 관련 API 라우트 (Prisma 연동)
 */

import express = require('express');
import prisma from '../lib/prisma';

const router = express.Router();

/**
 * POST /api/auth/register - 회원가입
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: '이메일, 비밀번호, 이름은 필수입니다.' });
    }

    // 이메일 중복 체크
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ success: false, message: '이미 사용 중인 이메일입니다.' });
    }

    // TODO: 비밀번호 해싱 (bcrypt 등)
    const user = await prisma.user.create({
      data: { email, password, name },
    });

    return res.status(201).json({
      success: true,
      message: '회원가입 성공',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('회원가입 실패:', error);
    res.status(500).json({ success: false, message: '회원가입 실패' });
  }
});

/**
 * POST /api/auth/login - 로그인
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: '이메일과 비밀번호를 입력해 주세요.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // TODO: 비밀번호 해싱 비교 (bcrypt.compare 등)
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // TODO: JWT 토큰 생성
    const token = `fake-${user.id}-${Date.now()}`;

    return res.status(200).json({
      success: true,
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('로그인 실패:', error);
    res.status(500).json({ success: false, message: '로그인 실패' });
  }
});

/**
 * GET /api/auth/users - 사용자 목록 조회 (관리자용)
 */
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { id: 'desc' },
    });

    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error('사용자 목록 조회 실패:', error);
    res.status(500).json({ success: false, message: '사용자 목록 조회 실패' });
  }
});

/**
 * DELETE /api/auth/users/:id - 사용자 삭제 (관리자용)
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    await prisma.user.delete({ where: { id: userId } });
    res.json({ success: true, message: '사용자가 삭제되었습니다' });
  } catch (error) {
    console.error('사용자 삭제 실패:', error);
    res.status(500).json({ success: false, message: '사용자 삭제 실패' });
  }
});

export = router;
