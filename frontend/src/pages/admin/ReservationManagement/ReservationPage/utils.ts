import dayjs from 'dayjs';
import { MOCK_RESERVATIONS } from './constants';
import type { ReservationItem, ReservationStatus } from './types';
import type { PeriodType } from './hooks/useReservationFilter';

/**
 * 기간, 상태, 검색어를 기준으로 예약 목록을 필터링
 */
export const filterReservations = (
  period: PeriodType,
  status: ReservationStatus | 'all',
  search: string,
): ReservationItem[] => {
  const now = dayjs();
  const keyword = search.trim().toLowerCase();

  return MOCK_RESERVATIONS.filter((r) => {
    // 기간 필터
    const d = dayjs(r.date);
    const matchPeriod =
      period === 'all'
        ? true
        : period === 'today'
        ? d.isSame(now, 'day')
        : d.isAfter(now.subtract(7, 'day').startOf('day')) || d.isSame(now, 'day');

    // 상태 필터
    const matchStatus = status === 'all' || r.status === status;

    // 검색 (이름/메모/예약번호)
    const matchKeyword =
      !keyword ||
      r.customerName.toLowerCase().includes(keyword) ||
      (r.memo || '').toLowerCase().includes(keyword) ||
      r.id.toLowerCase().includes(keyword);

    return matchPeriod && matchStatus && matchKeyword;
  });
};

/**
 * 필터링된 예약 목록에서 상태별 개수를 계산
 */
export const calculateSummary = (reservations: ReservationItem[]) => {
  const total = reservations.length;
  const confirmed = reservations.filter((r) => r.status === 'confirmed').length;
  const pending = reservations.filter((r) => r.status === 'pending').length;
  const canceled = reservations.filter((r) => r.status === 'canceled').length;
  return { total, confirmed, pending, canceled };
};
