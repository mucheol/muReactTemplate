import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

// 레이아웃
import { MainLayout } from '../../layouts/main/MainLayout';
import { AdminLayout } from '../../layouts/admin/AdminLayout';

// ScrollToTop 컴포넌트
import { ScrollToTop } from '../../components/common/ScrollToTop';

// 인증 페이지
const LoginPage = React.lazy(() => import('../../pages/auth/LoginPage/LoginPage'));
const RegisterPage = React.lazy(() => import('../../pages/auth/RegisterPage/RegisterPage'));
const FindPasswordPage = React.lazy(() => import('../../pages/auth/FindPasswordPage/FindPasswordPage'));

// 사용자 페이지
const HomePage = React.lazy(() => import('../../pages/user/home/HomePage/HomePage'));
const BlogPage = React.lazy(() => import('../../pages/user/blog/BlogPage/BlogPage'));
const BlogDetailPage = React.lazy(() => import('../../pages/user/blog/BlogDetailPage/BlogDetailPage'));
const ShopPage = React.lazy(() => import('../../pages/user/shop/ShopPage/ShopPage'));
const ShopDetailPage = React.lazy(() => import('../../pages/user/shop/ShopDetailPage/ShopDetailPage'));
const EventPage = React.lazy(() => import('../../pages/user/event/EventPage/EventPage'));
const EventDetailPage = React.lazy(() => import('../../pages/user/event/EventDetailPage/EventDetailPage'));
const FaqPage = React.lazy(() => import('../../pages/user/faq/FaqPage/FaqPage'));
const ReservationPage = React.lazy(() => import('../../pages/user/reservation/ReservationPage/ReservationPage'));
const MyPage = React.lazy(() => import('../../pages/user/MyPage'));

// 관리자 페이지
const AdminDashboardPage = React.lazy(() => import('../../pages/admin/AdminDashboard/AdminDashboard'));
const BlogManagementPage = React.lazy(() => import('../../pages/admin/BlogManagement/BlogManagementPage'));
const ShopManagementPage = React.lazy(() => import('../../pages/admin/ShopManagement/ShopManagementPage'));
const EventManagementPage = React.lazy(() => import('../../pages/admin/EventManagement/EventManagementPage'));
const FaqManagementPage = React.lazy(() => import('../../pages/admin/FaqManagement/FaqManagementPage'));
const ReservationManagementPage = React.lazy(() => import('../../pages/admin/ReservationManagement/ReservationPage/ReservationPage'));

const PageFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress />
  </Box>
);

/**
 * 메인 라우터
 * - 사용자 페이지: MainLayout 사용
 * - 관리자 페이지: AdminLayout 사용 (/admin/* 경로)
 */
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
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
                  {/* 홈 */}
                  <Route path="/" element={<HomePage />} />

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
      </Suspense>
    </BrowserRouter>
  );
};
