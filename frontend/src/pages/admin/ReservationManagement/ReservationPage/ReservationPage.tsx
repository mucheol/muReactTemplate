import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { reservationApi, type ReservationItem, type ReservationStatus } from '../../../../modules/reservation';
import dayjs from 'dayjs';

const STATUS_LABELS: Record<ReservationStatus, { label: string; color: 'default' | 'primary' | 'success' | 'error' }> = {
  pending: { label: '대기중', color: 'default' },
  confirmed: { label: '확인완료', color: 'success' },
  canceled: { label: '취소됨', color: 'error' },
};

const ReservationPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reservationApi.getReservations();
      setReservations(response.data);
    } catch (err) {
      console.error('예약 목록 조회 실패:', err);
      setError('예약 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: ReservationStatus) => {
    try {
      await reservationApi.updateReservation(id, { status: newStatus });
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error('상태 변경 실패:', err);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await reservationApi.deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('예약 삭제 실패:', err);
      alert('예약 삭제에 실패했습니다.');
    }
  };

  // 요약 통계 계산
  const summary = {
    total: reservations.length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    canceled: reservations.filter((r) => r.status === 'canceled').length,
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1 }}>
              RESERVATION
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              예약 관리
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              예약 현황을 확인하고 관리하세요.
            </Typography>
          </Box>
          <Button variant="outlined" onClick={fetchReservations}>
            새로고침
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 요약 카드 */}
        <Stack direction="row" spacing={2} mb={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                전체
              </Typography>
              <Typography variant="h4">{summary.total}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                대기중
              </Typography>
              <Typography variant="h4" color="warning.main">
                {summary.pending}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                확인완료
              </Typography>
              <Typography variant="h4" color="success.main">
                {summary.confirmed}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                취소됨
              </Typography>
              <Typography variant="h4" color="error.main">
                {summary.canceled}
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Card>
          <CardContent>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ bgcolor: 'grey.100' }}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>예약자</TableCell>
                    <TableCell>연락처</TableCell>
                    <TableCell>날짜</TableCell>
                    <TableCell>시간</TableCell>
                    <TableCell>인원</TableCell>
                    <TableCell>상태</TableCell>
                    <TableCell>메모</TableCell>
                    <TableCell align="center">작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography color="text.secondary" sx={{ py: 4 }}>
                          등록된 예약이 없습니다.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    reservations.map((reservation) => (
                      <TableRow key={reservation.id} hover>
                        <TableCell>{reservation.id}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {reservation.customerName}
                          </Typography>
                          {reservation.email && (
                            <Typography variant="caption" color="text.secondary">
                              {reservation.email}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{reservation.phone || '-'}</TableCell>
                        <TableCell>{dayjs(reservation.date).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{reservation.time}</TableCell>
                        <TableCell>{reservation.people}명</TableCell>
                        <TableCell>
                          <Chip
                            label={STATUS_LABELS[reservation.status].label}
                            size="small"
                            color={STATUS_LABELS[reservation.status].color}
                            onClick={() => {
                              const statuses: ReservationStatus[] = [
                                'pending',
                                'confirmed',
                                'canceled',
                              ];
                              const currentIndex = statuses.indexOf(reservation.status);
                              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                              handleStatusChange(reservation.id, nextStatus);
                            }}
                            sx={{ cursor: 'pointer' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {reservation.memo || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(reservation.id)}
                              title="삭제"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ReservationPage;
