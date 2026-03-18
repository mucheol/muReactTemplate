import React from 'react';

// preload 가능한 lazy 컴포넌트 생성 헬퍼
export function lazyWithPreload<T extends React.ComponentType>(
  factory: () => Promise<{ default: T }>
) {
  const Component = React.lazy(factory);
  (Component as typeof Component & { preload: () => void }).preload = factory;
  return Component as typeof Component & { preload: () => void };
}

// 인증 페이지
export const LoginPage = lazyWithPreload(() => import('../../pages/auth/LoginPage/LoginPage'));
export const RegisterPage = lazyWithPreload(() => import('../../pages/auth/RegisterPage/RegisterPage'));
export const FindPasswordPage = lazyWithPreload(() => import('../../pages/auth/FindPasswordPage/FindPasswordPage'));

// 사용자 페이지
export const HomePage = lazyWithPreload(() => import('../../pages/user/home/HomePage/HomePage'));
export const BlogPage = lazyWithPreload(() => import('../../pages/user/blog/BlogPage/BlogPage'));
export const BlogDetailPage = lazyWithPreload(() => import('../../pages/user/blog/BlogDetailPage/BlogDetailPage'));
export const ShopPage = lazyWithPreload(() => import('../../pages/user/shop/ShopPage/ShopPage'));
export const ShopDetailPage = lazyWithPreload(() => import('../../pages/user/shop/ShopDetailPage/ShopDetailPage'));
export const EventPage = lazyWithPreload(() => import('../../pages/user/event/EventPage/EventPage'));
export const EventDetailPage = lazyWithPreload(() => import('../../pages/user/event/EventDetailPage/EventDetailPage'));
export const FaqPage = lazyWithPreload(() => import('../../pages/user/faq/FaqPage/FaqPage'));
export const ReservationPage = lazyWithPreload(() => import('../../pages/user/reservation/ReservationPage/ReservationPage'));
export const MyPage = lazyWithPreload(() => import('../../pages/user/MyPage'));

// 관리자 페이지
export const AdminDashboardPage = lazyWithPreload(() => import('../../pages/admin/AdminDashboard/AdminDashboard'));
export const BlogManagementPage = lazyWithPreload(() => import('../../pages/admin/BlogManagement/BlogManagementPage'));
export const ShopManagementPage = lazyWithPreload(() => import('../../pages/admin/ShopManagement/ShopManagementPage'));
export const EventManagementPage = lazyWithPreload(() => import('../../pages/admin/EventManagement/EventManagementPage'));
export const FaqManagementPage = lazyWithPreload(() => import('../../pages/admin/FaqManagement/FaqManagementPage'));
export const ReservationManagementPage = lazyWithPreload(() => import('../../pages/admin/ReservationManagement/ReservationPage/ReservationPage'));

// 경로 → preload 함수 매핑
export const routePreloadMap: Record<string, () => void> = {
  '/': HomePage.preload,
  '/blog': BlogPage.preload,
  '/shop': ShopPage.preload,
  '/event': EventPage.preload,
  '/faq': FaqPage.preload,
  '/reservation': ReservationPage.preload,
  '/mypage': MyPage.preload,
  '/auth/login': LoginPage.preload,
  '/auth/register': RegisterPage.preload,
  '/find-password': FindPasswordPage.preload,
  '/admin/home': AdminDashboardPage.preload,
  '/admin/blog': BlogManagementPage.preload,
  '/admin/shop': ShopManagementPage.preload,
  '/admin/event': EventManagementPage.preload,
  '/admin/faq': FaqManagementPage.preload,
  '/admin/reservation': ReservationManagementPage.preload,
};
