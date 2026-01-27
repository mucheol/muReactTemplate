/**
 * 이벤트 API 모듈
 */

import apiClient from '../../utils/api/apiClient';

export type EventCategory = 'discount' | 'coupon' | 'prize' | 'promotion';
export type EventStatusFilter = 'all' | 'ongoing' | 'ended';

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
