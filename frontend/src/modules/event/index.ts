/**
 * 이벤트 API 모듈
 */

import apiClient from '../../utils/api/apiClient';

export type EventCategory = 'discount' | 'coupon' | 'prize' | 'promotion' | 'attendance' | 'timesale' | 'quiz' | 'stamp';
export type EventStatusFilter = 'all' | 'ongoing' | 'ended';

/**
 * 경품 아이템
 */
export interface PrizeItem {
  id: number;
  name: string;
  probability: number;
  color: string;
}

/**
 * 기획전 상품
 */
export interface PromotionProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  category: string;
}

/**
 * 기획전 섹션
 */
export interface PromotionSection {
  id: string;
  title: string;
  products: PromotionProduct[];
}

/**
 * 퀴즈 아이템
 */
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

/**
 * 스탬프 위치
 */
export interface StampLocation {
  id: string;
  title: string;
  description: string;
  path: string;
}

/**
 * 타임세일 상품
 */
export interface TimeSaleProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  maxStock: number;
  imageUrl?: string;
}

/**
 * 이벤트 아이템 인터페이스
 */
export interface EventItem {
  id: number;
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  category: EventCategory;
  startDate: string;
  endDate: string;
  content?: string;
  howToParticipate?: string[];
  benefits?: string[];
  notes?: string[];
  prizeItems?: PrizeItem[];
  prizeType?: 'wheel' | 'ladder';
  promotionSections?: PromotionSection[];
  quizQuestions?: QuizQuestion[];
  stampLocations?: StampLocation[];
  timeSaleProducts?: TimeSaleProduct[];
  timeSaleEndTime?: string;
}

/**
 * API 응답 인터페이스
 */
export interface EventsResponse {
  success: boolean;
  count: number;
  data: EventItem[];
}

export interface EventResponse {
  success: boolean;
  data: EventItem;
}

export interface CategoriesResponse {
  success: boolean;
  data: string[];
}

/**
 * 이벤트 목록 조회 파라미터
 */
export interface GetEventsParams {
  status?: EventStatusFilter;
  category?: string;
}

/**
 * 이벤트 API 객체
 */
export const eventApi = {
  /**
   * 이벤트 목록 조회
   * GET /api/event/events
   */
  getEvents: async (params?: GetEventsParams): Promise<EventsResponse> => {
    const response = await apiClient.get<EventsResponse>('/event/events', {
      params,
    });
    return response.data;
  },

  /**
   * 특정 이벤트 조회
   * GET /api/event/events/:id
   */
  getEvent: async (id: number): Promise<EventResponse> => {
    const response = await apiClient.get<EventResponse>(`/event/events/${id}`);
    return response.data;
  },

  /**
   * 카테고리 목록 조회
   * GET /api/event/categories
   */
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await apiClient.get<CategoriesResponse>('/event/categories');
    return response.data;
  },
};

export default eventApi;
