import React from 'react';

function lazyWithPreload<T extends React.ComponentType>(
  factory: () => Promise<{ default: T }>
) {
  const Component = React.lazy(factory);
  (Component as typeof Component & { preload: () => void }).preload = factory;
  return Component as typeof Component & { preload: () => void };
}

// 관리자 페이지 — lazy (tiptap, recharts 포함으로 무거움)
export const AdminDashboardPage = lazyWithPreload(() => import('../../pages/admin/AdminDashboard/AdminDashboard'));
export const BlogManagementPage = lazyWithPreload(() => import('../../pages/admin/BlogManagement/BlogManagementPage'));
export const ShopManagementPage = lazyWithPreload(() => import('../../pages/admin/ShopManagement/ShopManagementPage'));
export const EventManagementPage = lazyWithPreload(() => import('../../pages/admin/EventManagement/EventManagementPage'));
export const FaqManagementPage = lazyWithPreload(() => import('../../pages/admin/FaqManagement/FaqManagementPage'));
export const ReservationManagementPage = lazyWithPreload(() => import('../../pages/admin/ReservationManagement/ReservationPage/ReservationPage'));
