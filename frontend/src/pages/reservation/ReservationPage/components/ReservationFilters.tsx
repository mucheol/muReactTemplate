import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { ReservationStatus } from '../types';
import type { PeriodType } from '../hooks/useReservationFilter';
import { CARD_STYLE } from '../constants';

interface ReservationFiltersProps {
  period: PeriodType;
  onChangePeriod: (p: PeriodType) => void;
  status: ReservationStatus | 'all';
  onChangeStatus: (s: ReservationStatus | 'all') => void;
  search: string;
  onChangeSearch: (v: string) => void;
}

export const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  period,
  onChangePeriod,
  status,
  onChangeStatus,
  search,
  onChangeSearch,
}) => {
  return (
    <Card sx={{ mb: 3, ...CARD_STYLE }}>
      <CardContent sx={{ py: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              select
              size="small"
              label="기간"
              value={period}
              onChange={(e) => onChangePeriod(e.target.value as PeriodType)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="today">오늘</MenuItem>
              <MenuItem value="7d">최근 7일</MenuItem>
              <MenuItem value="all">전체</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="상태"
              value={status}
              onChange={(e) => onChangeStatus(e.target.value as ReservationStatus | 'all')}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="pending">대기</MenuItem>
              <MenuItem value="confirmed">확정</MenuItem>
              <MenuItem value="canceled">취소</MenuItem>
            </TextField>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <TextField
            size="small"
            placeholder="이름, 메모, 예약번호 검색"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            sx={{ minWidth: { xs: '100%', md: 260 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};