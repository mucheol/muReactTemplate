import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import LoginPage from '../../pages/auth/LoginPage/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage/RegisterPage';
import FindPasswordPage from '../../pages/auth/FindPasswordPage/FindPasswordPage';
import MyPage from '../../pages/user/MyPage';
import BlogPage from '../../pages/blog/BlogPage/BlogPage';
import BlogDetailPage from '../../pages/blog/BlogDetailPage/BlogDetailPage';
import ShopPage from '../../pages/shop/ShopPage/ShopPage';
import ShopDetailPage from '../../pages/shop/ShopDetailPage/ShopDetailPage';
import { MainLayout } from '../../layouts/main/MainLayout';
import EventPage from '../../pages/event/EventPage/EventPage';
import DiscountEventDetailPage from '../../pages/event/EventDetailPage/DiscountEventDetailPage';
import CouponEventDetailPage from '../../pages/event/EventDetailPage/CouponEventDetailPage';
import PrizeEventDetailPage from '../../pages/event/EventDetailPage/PrizeEventDetailPage';
import PromotionEventDetailPage from '../../pages/event/EventDetailPage/PromotionEventDetailPage';
import DashboardPage from '../../pages/dashboard/DashboardPage/DashboardPage';
import FaqPage from '../../pages/faq/FaqPage/FaqPage';
import ReservationPage from '../../pages/reservation/ReservationPage/ReservationPage';
import { ScrollToTop } from '../../components/common/ScrollToTop';

// 메인 라우터: 각 페이지와 레이아웃을 연결하는 곳
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path='/event/discount' element={<DiscountEventDetailPage />}/>
          <Route path='/event/coupon' element={<CouponEventDetailPage />}/>
          <Route path='/event/prize' element={<PrizeEventDetailPage />}/>
          <Route path='/event/promotion' element={<PromotionEventDetailPage />}/>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
