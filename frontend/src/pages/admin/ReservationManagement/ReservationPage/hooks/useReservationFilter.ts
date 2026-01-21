import { useMemo, useState } from 'react';
import type { ReservationItem, ReservationStatus } from '../types';
import { filterReservations, calculateSummary } from '../utils';

export type PeriodType = 'today' | '7d' | 'all';

interface UseReservationFilterResult {
  period: PeriodType;
  setPeriod: (p: PeriodType) => void;
  status: ReservationStatus | 'all';
  setStatus: (s: ReservationStatus | 'all') => void;
  search: string;
  setSearch: (s: string) => void;
  filteredReservations: ReservationItem[];
  summary: {
    total: number;
    confirmed: number;
    pending: number;
    canceled: number;
  };
}

export const useReservationFilter = (): UseReservationFilterResult => {
  const [period, setPeriod] = useState<PeriodType>('today');
  const [status, setStatus] = useState<ReservationStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredReservations = useMemo(() => {
    return filterReservations(period, status, search);
  }, [period, status, search]);

  const summary = useMemo(() => {
    return calculateSummary(filteredReservations);
  }, [filteredReservations]);

  return {
    period,
    setPeriod,
    status,
    setStatus,
    search,
    setSearch,
    filteredReservations,
    summary,
  };
};