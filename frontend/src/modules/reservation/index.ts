/**
 * 예약 API 모듈
 */

import apiClient from '../../utils/api/apiClient';

/**
 * 예약 상태 타입
 */
export type ReservationStatus = 'pending' | 'confirmed' | 'canceled';

/**
 * 예약 아이템 인터페이스
 */
export interface ReservationItem {
  id: number;
  customerName: string;
  email?: string;
  phone?: string;
  date: string; // ISO or YYYY-MM-DD
  time: string; // HH:mm
  people: number;
  status: ReservationStatus;
  memo?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API 응답 인터페이스
 */
export interface ReservationsResponse {
  success: boolean;
  count: number;
  data: ReservationItem[];
}

export interface ReservationResponse {
  success: boolean;
  data: ReservationItem;
}

/**
 * 예약 목록 조회 파라미터
 */
export interface GetReservationsParams {
  status?: ReservationStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
}

/**
 * 예약 생성/수정 페이로드
 */
export interface ReservationPayload {
  customerName: string;
  email?: string;
  phone?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  people: number;
  status?: ReservationStatus;
  memo?: string;
}

/**
 * 예약 API 객체
 */
export const reservationApi = {
  /**
   * 예약 목록 조회
   * GET /api/reservation/items
   */
  getReservations: async (params?: GetReservationsParams): Promise<ReservationsResponse> => {
    const response = await apiClient.get<ReservationsResponse>('/reservation/items', {
      params,
    });
    return response.data;
  },

  /**
   * 특정 예약 조회
   * GET /api/reservation/items/:id
   */
  getReservation: async (id: number): Promise<ReservationResponse> => {
    const response = await apiClient.get<ReservationResponse>(`/reservation/items/${id}`);
    return response.data;
  },

  /**
   * 예약 생성
   * POST /api/reservation/items
   */
  createReservation: async (payload: ReservationPayload): Promise<ReservationResponse> => {
    const response = await apiClient.post<ReservationResponse>('/reservation/items', payload);
    return response.data;
  },

  /**
   * 예약 수정
   * PUT /api/reservation/items/:id
   */
  updateReservation: async (
    id: number,
    payload: Partial<ReservationPayload>
  ): Promise<ReservationResponse> => {
    const response = await apiClient.put<ReservationResponse>(`/reservation/items/${id}`, payload);
    return response.data;
  },

  /**
   * 예약 삭제
   * DELETE /api/reservation/items/:id
   */
  deleteReservation: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/reservation/items/${id}`
    );
    return response.data;
  },

  /**
   * 예약 가능 시간 조회
   * GET /api/reservation/available-times?date=YYYY-MM-DD
   */
  getAvailableTimes: async (date: string): Promise<{ success: boolean; data: string[] }> => {
    const response = await apiClient.get<{ success: boolean; data: string[] }>(
      '/reservation/available-times',
      {
        params: { date },
      }
    );
    return response.data;
  },

  /**
   * 예약 조회 (전화번호 또는 이메일)
   * GET /api/reservation/lookup?phone=xxx&email=xxx
   */
  lookupReservations: async (params: {
    phone?: string;
    email?: string;
  }): Promise<ReservationsResponse> => {
    const response = await apiClient.get<ReservationsResponse>('/reservation/lookup', {
      params,
    });
    return response.data;
  },
};

export default reservationApi;
