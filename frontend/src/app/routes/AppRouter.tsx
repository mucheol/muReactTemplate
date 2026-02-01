import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 레이아웃
import { MainLayout } from '../../layouts/main/MainLayout';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

// 인증 페이지
import LoginPage from '../../pages/auth/LoginPage/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage/RegisterPage';
import FindPasswordPage from '../../pages/auth/FindPasswordPage/FindPasswordPage';

// 사용자 페이지 (기존 페이지들 - user 폴더로 이동됨)
import BlogPage from '../../pages/user/blog/BlogPage/BlogPage';
import BlogDetailPage from '../../pages/user/blog/BlogDetailPage/BlogDetailPage';
import ShopPage from '../../pages/user/shop/ShopPage/ShopPage';
import ShopDetailPage from '../../pages/user/shop/ShopDetailPage/ShopDetailPage';
import EventPage from '../../pages/user/event/EventPage/EventPage';
import EventDetailPage from '../../pages/user/event/EventDetailPage/EventDetailPage';
import FaqPage from '../../pages/user/faq/FaqPage/FaqPage';
import ReservationPage from '../../pages/user/reservation/ReservationPage/ReservationPage';

// 마이페이지
import MyPage from '../../pages/user/MyPage';

// 관리자 페이지
import AdminDashboardPage from '../../pages/admin/AdminDashboard/AdminDashboard';
import BlogManagementPage from '../../pages/admin/BlogManagement/BlogManagementPage';
import ShopManagementPage from '../../pages/admin/ShopManagement/ShopManagementPage';
import EventManagementPage from '../../pages/admin/EventManagement/EventManagementPage';
import FaqManagementPage from '../../pages/admin/FaqManagement/FaqManagementPage';
import ReservationManagementPage from '../../pages/admin/ReservationManagement/ReservationPage/ReservationPage';

// ScrollToTop 컴포넌트
import { ScrollToTop } from '../../components/common/ScrollToTop';

/**
 * 메인 라우터
 * - 사용자 페이지: MainLayout 사용
 * - 관리자 페이지: AdminLayout 사용 (/admin/* 경로)
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
          }
        />

        {/* 사용자 페이지 */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* 인증 */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/find-password" element={<FindPasswordPage />} />

                {/* 마이페이지 */}
                <Route path="/mypage" element={<MyPage />} />

                {/* 블로그 */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />

                {/* 쇼핑몰 */}
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:id" element={<ShopDetailPage />} />

                {/* 이벤트 */}
                <Route path="/event" element={<EventPage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />

                {/* FAQ */}
                <Route path="/faq" element={<FaqPage />} />

                {/* 예약 */}
                <Route path="/reservation" element={<ReservationPage />} />

              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
