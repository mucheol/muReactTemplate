import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import LoginPage from '../../pages/auth/LoginPage/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage/RegisterPage';
import FindPasswordPage from '../../pages/auth/FindPasswordPage/FindPasswordPage';
import MyPage from '../../pages/user/MyPage/MyPage';
import BlogPage from '../../pages/blog/BlogPage/BlogPage';
import BlogDetailPage from '../../pages/blog/BlogDetailPage/BlogDetailPage';
import { MainLayout } from '../../layouts/main/MainLayout';

// 메인 라우터: 각 페이지와 레이아웃을 연결하는 곳
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
