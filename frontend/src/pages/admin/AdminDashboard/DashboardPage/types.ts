export type PeriodType = 'today' | '7d' | '30d';
export type ChannelType = 'all' | 'web' | 'mobile';

export interface TrafficDataPoint {
  name: string;
  visitors: number;
  orders: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  color: 'primary' | 'success' | 'warning' | 'info';
}

export interface ChartColors {
  primary: string;
  success: string;
  warning: string;
}
