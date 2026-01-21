import type { TrafficDataPoint, ChannelType } from './types';

export const calculateTotal = (data: TrafficDataPoint[], key: 'visitors' | 'orders'): number => {
  return data.reduce((sum, d) => sum + d[key], 0);
};

export const calculateConversionRate = (visitors: number, orders: number): string => {
  return visitors > 0 ? ((orders / visitors) * 100).toFixed(1) : '0.0';
};

export const getChannelPieData = (channel: ChannelType) => {
  return [
    { name: '웹', value: channel === 'mobile' ? 20 : 60 },
    { name: '모바일', value: channel === 'web' ? 20 : 35 },
    { name: '기타', value: 5 },
  ];
};
