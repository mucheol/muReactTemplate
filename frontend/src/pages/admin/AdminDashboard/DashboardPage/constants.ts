import type { TrafficDataPoint } from './types';

export const CHART_COLORS = {
  primary: '#1976d2',
  success: '#2e7d32',
  warning: '#ed6c02',
} as const;

export const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.warning];

export const CARD_STYLE = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'grey.200',
} as const;

export const TRAFFIC_DATA: Record<'today' | '7d' | '30d', TrafficDataPoint[]> = {
  today: [
    { name: '09시', visitors: 120, orders: 8 },
    { name: '12시', visitors: 340, orders: 22 },
    { name: '15시', visitors: 280, orders: 17 },
    { name: '18시', visitors: 460, orders: 30 },
    { name: '21시', visitors: 320, orders: 19 },
  ],
  '7d': [
    { name: '월', visitors: 1000, orders: 90 },
    { name: '화', visitors: 1200, orders: 110 },
    { name: '수', visitors: 900, orders: 80 },
    { name: '목', visitors: 1500, orders: 130 },
    { name: '금', visitors: 1800, orders: 160 },
    { name: '토', visitors: 2000, orders: 180 },
    { name: '일', visitors: 1600, orders: 140 },
  ],
  '30d': [
    { name: '1주차', visitors: 5200, orders: 430 },
    { name: '2주차', visitors: 6100, orders: 500 },
    { name: '3주차', visitors: 5800, orders: 470 },
    { name: '4주차', visitors: 6400, orders: 520 },
  ],
};

export const REVENUE_DATA = {
  today: '₩ 1.2M',
  '7d': '₩ 8.7M',
  '30d': '₩ 36.4M',
} as const;

export const CONVERSION_RATE_DATA = {
  today: '2.4%',
  '7d': '2.7%',
  '30d': '3.1%',
} as const;
