import type { ReservationItem, ReservationStatus } from './types';

export const CARD_STYLE = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'grey.200',
  bgcolor: 'white',
} as const;

// 예약 상태 라벨
export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: '대기',
  confirmed: '확정',
  canceled: '취소',
};

// 예약 상태 색상
export const STATUS_COLORS: Record<
  ReservationStatus,
  'default' | 'success' | 'warning' | 'error'
> = {
  pending: 'warning',
  confirmed: 'success',
  canceled: 'error',
};

// ✅ 예약 더미 데이터
export const MOCK_RESERVATIONS: ReservationItem[] = [
  {
    id: 'R-20260116-001',
    customerName: '홍길동',
    date: '2026-01-16',
    time: '18:30',
    people: 2,
    status: 'confirmed',
    memo: '창가 자리 요청',
  },
  {
    id: 'R-20260116-002',
    customerName: '김영희',
    date: '2026-01-16',
    time: '19:00',
    people: 4,
    status: 'pending',
    memo: '생일 케이크 준비',
  },
  {
    id: 'R-20260117-001',
    customerName: '이철수',
    date: '2026-01-17',
    time: '12:00',
    people: 3,
    status: 'canceled',
    memo: '당일 취소',
  },
  {
    id: 'R-20260118-001',
    customerName: '박민수',
    date: '2026-01-18',
    time: '20:00',
    people: 5,
    status: 'confirmed',
  },
];