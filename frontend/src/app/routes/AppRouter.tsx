import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

// 레이아웃
import { MainLayout } from '../../layouts/main/MainLayout';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

// ScrollToTop 컴포넌트
import { ScrollToTop } from '../../components/common/ScrollToTop';

// 사용자 페이지 — eager import (페이지 이동 시 로딩 없음)
import LoginPage from '../../pages/auth/LoginPage/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage/RegisterPage';
import FindPasswordPage from '../../pages/auth/FindPasswordPage/FindPasswordPage';
import HomePage from '../../pages/user/home/HomePage/HomePage';
import BlogPage from '../../pages/user/blog/BlogPage/BlogPage';
import BlogDetailPage from '../../pages/user/blog/BlogDetailPage/BlogDetailPage';
import ShopPage from '../../pages/user/shop/ShopPage/ShopPage';
import ShopDetailPage from '../../pages/user/shop/ShopDetailPage/ShopDetailPage';
import EventPage from '../../pages/user/event/EventPage/EventPage';
import EventDetailPage from '../../pages/user/event/EventDetailPage/EventDetailPage';
import FaqPage from '../../pages/user/faq/FaqPage/FaqPage';
import ReservationPage from '../../pages/user/reservation/ReservationPage/ReservationPage';
import MyPage from '../../pages/user/MyPage';

// 관리자 페이지 — lazy (tiptap, recharts 등 무거운 deps 지연 로드)
import {
  AdminDashboardPage,
  BlogManagementPage,
  ShopManagementPage,
  EventManagementPage,
  FaqManagementPage,
  ReservationManagementPage,
} from './lazyPreload';

const AdminFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress />
  </Box>
);

/**
 * 메인 라우터
 * - 사용자 페이지: eager import → 페이지 이동 시 로딩 없음
 * - 관리자 페이지: lazy → tiptap/recharts 지연 로드
 */
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 관리자 페이지 */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminLayout>
                <Routes>
                  <Route path="home" element={<AdminDashboardPage />} />
                  <Route path="blog" element={<BlogManagementPage />} />
                  <Route path="shop" element={<ShopManagementPage />} />
                  <Route path="event" element={<EventManagementPage />} />
                  <Route path="faq" element={<FaqManagementPage />} />
                  <Route path="reservation" element={<ReservationManagementPage />} />
                </Routes>
              </AdminLayout>
            </Suspense>
          }
        />

        {/* 사용자 페이지 */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/find-password" element={<FindPasswordPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:id" element={<ShopDetailPage />} />
                <Route path="/event" element={<EventPage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
