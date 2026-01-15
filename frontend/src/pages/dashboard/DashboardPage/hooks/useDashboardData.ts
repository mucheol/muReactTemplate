import { useMemo } from 'react';
import type { PeriodType, ChannelType } from '../types';
import { TRAFFIC_DATA, REVENUE_DATA, CONVERSION_RATE_DATA } from '../constants';
import { calculateTotal, getChannelPieData } from '../utils';

export const useDashboardData = (period: PeriodType, channel: ChannelType) => {
  const trafficData = useMemo(() => TRAFFIC_DATA[period], [period]);

  const totalVisitors = useMemo(() => calculateTotal(trafficData, 'visitors'), [trafficData]);

  const totalOrders = useMemo(() => calculateTotal(trafficData, 'orders'), [trafficData]);

  const revenue = useMemo(() => REVENUE_DATA[period], [period]);

  const conversionRate = useMemo(() => CONVERSION_RATE_DATA[period], [period]);

  const channelPieData = useMemo(() => getChannelPieData(channel), [channel]);

  return {
    trafficData,
    totalVisitors,
    totalOrders,
    revenue,
    conversionRate,
    channelPieData,
  };
};
