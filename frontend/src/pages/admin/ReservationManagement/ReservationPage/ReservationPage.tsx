import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { useReservationFilter } from './hooks/useReservationFilter';
import { ReservationFilters } from './components/ReservationFilters';
import { ReservationSummary } from './components/ReservationSummary';
import { ReservationList } from './components/ReservationList';
import { ReservationDetailModal } from './components/ReservationDetailModal';
import { ReservationCreateModal } from './components/ReservationCreateModal';
import type { ReservationItem } from './types';

const ReservationPage: React.FC = () => {
  const today = dayjs().format('YYYY.MM.DD');

  const {
    period,
    setPeriod,
    status,
    setStatus,
    search,
    setSearch,
    filteredReservations,
    summary,
  } = useReservationFilter();

  // 모달 상태 관리
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationItem | null>(null);

  const handleRowClick = (reservation: ReservationItem) => {
    setSelectedReservation(reservation);
    setDetailModalOpen(true);
  };

  const handleSaveReservation = (updated: ReservationItem) => {
    // TODO: 실제로는 API 호출로 데이터 업데이트
    console.log('예약 수정:', updated);
    // 임시로 콘솔 출력만 하고, 실제 상태 업데이트는 생략
    // (MOCK_RESERVATIONS가 constants에 있어서 직접 수정 불가)
  };

  const handleCreateReservation = (newReservation: ReservationItem) => {
    // TODO: 실제로는 API 호출로 데이터 생성
    console.log('예약 생성:', newReservation);
    // 임시로 콘솔 출력만 하고, 실제 상태 업데이트는 생략
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* 헤더 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1 }}>
              RESERVATION
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              예약 관리
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              기간, 상태, 검색 조건을 통해 예약 현황을 빠르게 확인하세요.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              기준일: {today}
            </Typography>
          </Box>

          {/* 예약 생성 버튼 */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateModalOpen(true)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              예약 등록
            </Button>
          </Box>
        </Box>

        {/* 필터 */}
        <ReservationFilters
          period={period}
          onChangePeriod={setPeriod}
          status={status}
          onChangeStatus={setStatus}
          search={search}
          onChangeSearch={setSearch}
        />

        {/* 요약 카드 */}
        <ReservationSummary
          total={summary.total}
          confirmed={summary.confirmed}
          pending={summary.pending}
          canceled={summary.canceled}
        />

        {/* 리스트 */}
        <ReservationList reservations={filteredReservations} onRowClick={handleRowClick} />

        {/* 예약 상세/수정 모달 */}
        <ReservationDetailModal
          open={detailModalOpen}
          reservation={selectedReservation}
          onClose={() => setDetailModalOpen(false)}
          onSave={handleSaveReservation}
        />

        {/* 예약 생성 모달 */}
        <ReservationCreateModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateReservation}
        />
      </Container>
    </Box>
  );
};

export default ReservationPage;
