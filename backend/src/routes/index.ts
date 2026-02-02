/**
 * 메인 라우터 (모든 API 경로를 모아놓는 곳)
 *
 * 이 파일은 여러 기능별 라우터들을 하나로 모아서
 * app.ts에 제공하는 역할을 합니다.
 *
 * 예:
 * - /api/auth/... → authRoutes로 연결
 * - /api/shop/... → shopRoutes로 연결
 */

import express = require('express');

/**
 * 각 기능별 라우터 import (가져오기)
 *
 * require()는 다른 파일의 코드를 가져오는 함수
 * ./auth.routes는 같은 폴더에 있는 auth.routes.ts 파일
 */
import authRoutes = require('./auth.routes');  // 인증 관련 API (로그인, 회원가입)
import shopRoutes = require('./shop.routes');  // 쇼핑몰 관련 API (상품 조회)
import blogRoutes = require('./blog.routes');  // 블로그 관련 API (포스트 조회)
import eventRoutes = require('./event.routes');  // 이벤트 관련 API (이벤트 조회)
import faqRoutes = require('./faq.routes');  // FAQ 관련 API (FAQ 조회)
import uploadRoutes = require('./upload.routes');  // 파일 업로드 API (이미지 업로드)
import reservationRoutes = require('./reservation.routes');  // 예약 관련 API (예약 조회, 생성)
import seedRoutes = require('./seed.routes');  // 임시 시드 API (배포 후 삭제 예정)

/**
 * Express Router 생성
 *
 * Router는 API 경로들을 그룹으로 묶어주는 도구
 */
const router = express.Router();

/**
 * 라우터 연결하기
 *
 * router.use(경로, 라우터)
 * - 특정 경로로 들어오는 요청을 해당 라우터로 전달
 *
 * 예시:
 * - /api/auth/login → authRoutes에서 /login 처리
 * - /api/shop/products → shopRoutes에서 /products 처리
 */
router.use('/auth', authRoutes);  // /api/auth로 시작하는 모든 요청
router.use('/shop', shopRoutes);  // /api/shop으로 시작하는 모든 요청
router.use('/blog', blogRoutes);  // /api/blog로 시작하는 모든 요청
router.use('/event', eventRoutes);  // /api/event로 시작하는 모든 요청
router.use('/faq', faqRoutes);  // /api/faq로 시작하는 모든 요청
router.use('/upload', uploadRoutes);  // /api/upload로 시작하는 모든 요청
router.use('/reservation', reservationRoutes);  // /api/reservation로 시작하는 모든 요청
router.use('/seed', seedRoutes);  // /api/seed로 시작하는 모든 요청 (임시)

/**
 * 라우터를 외부로 내보내기
 *
 * app.ts에서 이 router를 import해서 사용함
 */
export = router;
