/**
 * FAQ API 모듈
 */

import apiClient from '../../utils/api/apiClient';

/**
 * FAQ 카테고리 타입
 */
export type FaqCategory = 'all' | 'service' | 'account' | 'payment' | 'etc';

/**
 * FAQ 아이템 인터페이스
 */
export interface FaqItem {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
  tags: string[];
}

/**
 * API 응답 인터페이스
 */
export interface FaqsResponse {
  success: boolean;
  count: number;
  data: FaqItem[];
}

export interface FaqResponse {
  success: boolean;
  data: FaqItem;
}

export interface CategoriesResponse {
  success: boolean;
  data: string[];
}

export interface CountsResponse {
  success: boolean;
  data: Record<string, number>;
}

/**
 * FAQ 목록 조회 파라미터
 */
export interface GetFaqsParams {
  category?: string;
  search?: string;
}

/**
 * FAQ 생성/수정 페이로드
 */
export interface FaqPayload {
  category: FaqCategory;
  question: string;
  answer: string;
  tags?: string[];
}

/**
 * FAQ API 객체
 */
export const faqApi = {
  /**
   * FAQ 목록 조회
   * GET /api/faq/items
   */
  getItems: async (params?: GetFaqsParams): Promise<FaqsResponse> => {
    const response = await apiClient.get<FaqsResponse>('/faq/items', {
      params,
    });
    return response.data;
  },

  /**
   * 특정 FAQ 조회
   * GET /api/faq/items/:id
   */
  getItem: async (id: number): Promise<FaqResponse> => {
    const response = await apiClient.get<FaqResponse>(`/faq/items/${id}`);
    return response.data;
  },

  /**
   * FAQ 생성
   * POST /api/faq/items
   */
  createItem: async (payload: FaqPayload): Promise<FaqResponse> => {
    const response = await apiClient.post<FaqResponse>('/faq/items', payload);
    return response.data;
  },

  /**
   * FAQ 수정
   * PUT /api/faq/items/:id
   */
  updateItem: async (id: number, payload: Partial<FaqPayload>): Promise<FaqResponse> => {
    const response = await apiClient.put<FaqResponse>(`/faq/items/${id}`, payload);
    return response.data;
  },

  /**
   * FAQ 삭제
   * DELETE /api/faq/items/:id
   */
  deleteItem: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/faq/items/${id}`);
    return response.data;
  },

  /**
   * 카테고리 목록 조회
   * GET /api/faq/categories
   */
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await apiClient.get<CategoriesResponse>('/faq/categories');
    return response.data;
  },

  /**
   * 카테고리별 FAQ 개수 조회
   * GET /api/faq/counts
   */
  getCounts: async (): Promise<CountsResponse> => {
    const response = await apiClient.get<CountsResponse>('/faq/counts');
    return response.data;
  },
};

export default faqApi;
