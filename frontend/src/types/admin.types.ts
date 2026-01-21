/**
 * 관리자 페이지 타입 정의
 */

// 관리자 메뉴 타입
export type AdminMenuType =
  | 'home'
  | 'dashboard'
  | 'blog'
  | 'shop'
  | 'event'
  | 'faq'
  | 'reservation';

// 관리자 권한
export type AdminRole = 'super' | 'manager' | 'viewer';

// 관리자 사용자 정보
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
}

// 관리 대상 컨텐츠 기본 인터페이스
export interface ManageableContent {
  id: string;
  title: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

// 블로그 관리 데이터
export interface BlogManagement extends ManageableContent {
  category: string;
  author: string;
  viewCount: number;
}

// 쇼핑몰 관리 데이터
export interface ShopManagement extends ManageableContent {
  category: string;
  price: number;
  stock: number;
  salesCount: number;
}

// 이벤트 관리 데이터
export interface EventManagement extends ManageableContent {
  type: 'discount' | 'coupon' | 'prize' | 'promotion';
  startDate: string;
  endDate: string;
  participantCount: number;
}

// FAQ 관리 데이터
export interface FaqManagement extends ManageableContent {
  category: string;
  viewCount: number;
  isPopular: boolean;
}
