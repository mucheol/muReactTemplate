/**
 * 템플릿 시스템 타입 정의
 */

// 템플릿 카테고리
export type TemplateCategory = 'blog' | 'shop' | 'event' | 'faq';

// 템플릿 번호 (1~3번 템플릿)
export type TemplateNumber = 1 | 2 | 3;

// 템플릿 정보 인터페이스
export interface TemplateInfo {
  id: string;
  category: TemplateCategory;
  templateNumber: TemplateNumber;
  title: string;
  description: string;
  thumbnail?: string;
  isActive: boolean;
}

// 템플릿 컨텐츠 인터페이스 (각 템플릿별 데이터)
export interface TemplateContent {
  id: string;
  category: TemplateCategory;
  templateNumber: TemplateNumber;
  data: Record<string, any>; // 템플릿마다 다른 데이터 구조
  updatedAt: string;
}

// 템플릿 선택 상태 (사용자가 어떤 템플릿을 보고 있는지)
export interface TemplateSelection {
  blog: TemplateNumber;
  shop: TemplateNumber;
  event: TemplateNumber;
  faq: TemplateNumber;
}
