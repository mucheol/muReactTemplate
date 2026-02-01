import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Stack,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { reservationApi, type ReservationPayload, type ReservationItem, type ReservationStatus } from '../../../../modules/reservation';
import dayjs from 'dayjs';

const STATUS_LABELS: Record<ReservationStatus, { label: string; color: 'default' | 'primary' | 'success' | 'error' }> = {
  pending: { label: '대기중', color: 'default' },
  confirmed: { label: '확인완료', color: 'success' },
  canceled: { label: '취소됨', color: 'error' },
};

/**
 * 사용자 예약 페이지
 */
const ReservationPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  // 예약 생성 관련 state
  const [formData, setFormData] = useState<ReservationPayload>({
    customerName: '',
    email: '',
    phone: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: '',
    people: 2,
    memo: '',
  });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 예약 조회 관련 state
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupReservations, setLookupReservations] = useState<ReservationItem[]>([]);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  // 날짜가 변경될 때 예약 가능 시간 조회
  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimes(formData.date);
    }
  }, [formData.date]);

  const fetchAvailableTimes = async (date: string) => {
    try {
      setLoadingTimes(true);
      const response = await reservationApi.getAvailableTimes(date);
      setAvailableTimes(response.data);
      // 선택한 시간이 가능한 시간에 없으면 초기화
      if (!response.data.includes(formData.time)) {
        setFormData((prev) => ({ ...prev, time: '' }));
      }
    } catch (err) {
      console.error('예약 가능 시간 조회 실패:', err);
      setAvailableTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  };

  const handleChange = (field: keyof ReservationPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.customerName.trim()) {
      setError('예약자명을 입력해주세요.');
      return;
    }
    if (!formData.phone?.trim()) {
      setError('연락처를 입력해주세요.');
      return;
    }
    if (!formData.date) {
      setError('예약 날짜를 선택해주세요.');
      return;
    }
    if (!formData.time) {
      setError('예약 시간을 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await reservationApi.createReservation({
        ...formData,
        status: 'pending',
      });
      setSuccess(true);
      // 폼 초기화
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        date: dayjs().format('YYYY-MM-DD'),
        time: '',
        people: 2,
        memo: '',
      });
    } catch (err: any) {
      console.error('예약 실패:', err);
      setError(err.response?.data?.message || '예약에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 예약 조회
  const handleLookup = async () => {
    if (!lookupPhone.trim() && !lookupEmail.trim()) {
      setLookupError('전화번호 또는 이메일을 입력해주세요.');
      return;
    }

    try {
      setLookupLoading(true);
      setLookupError(null);
      const response = await reservationApi.lookupReservations({
        phone: lookupPhone.trim() || undefined,
        email: lookupEmail.trim() || undefined,
      });
      setLookupReservations(response.data);
      if (response.data.length === 0) {
        setLookupError('예약 내역이 없습니다.');
      }
    } catch (err: any) {
      console.error('예약 조회 실패:', err);
      setLookupError(err.response?.data?.message || '예약 조회에 실패했습니다.');
    } finally {
      setLookupLoading(false);
    }
  };

  // 예약 취소
  const handleCancelReservation = async () => {
    if (!selectedReservationId) return;

    try {
      await reservationApi.updateReservation(selectedReservationId, { status: 'canceled' });
      // 목록 새로고침
      setLookupReservations((prev) =>
        prev.map((r) => (r.id === selectedReservationId ? { ...r, status: 'canceled' } : r))
      );
      setCancelDialogOpen(false);
      setSelectedReservationId(null);
    } catch (err: any) {
      console.error('예약 취소 실패:', err);
      alert('예약 취소에 실패했습니다.');
    }
  };

  const openCancelDialog = (id: number) => {
    setSelectedReservationId(id);
    setCancelDialogOpen(true);
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            예약
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            예약을 신청하거나 기존 예약을 조회할 수 있습니다.
          </Typography>

          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
            <Tab label="예약하기" />
            <Tab label="예약 조회" />
          </Tabs>

          {/* 예약하기 탭 */}
          {tabValue === 0 && (
            <>
              {success && (
                <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
                  예약이 성공적으로 접수되었습니다! 확인 후 연락드리겠습니다.
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="예약자명"
                required
                fullWidth
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                placeholder="홍길동"
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="연락처"
                    required
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="010-1234-5678"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="이메일"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="example@email.com"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="예약 날짜"
                    type="date"
                    required
                    fullWidth
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: dayjs().format('YYYY-MM-DD'),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel>예약 시간</InputLabel>
                    <Select
                      value={formData.time}
                      label="예약 시간"
                      onChange={(e) => handleChange('time', e.target.value)}
                      disabled={loadingTimes}
                    >
                      {loadingTimes ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          로딩 중...
                        </MenuItem>
                      ) : availableTimes.length === 0 ? (
                        <MenuItem disabled>예약 가능한 시간이 없습니다</MenuItem>
                      ) : (
                        availableTimes.map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl fullWidth required>
                <InputLabel>인원</InputLabel>
                <Select
                  value={formData.people}
                  label="인원"
                  onChange={(e) => handleChange('people', Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}명
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="요청사항"
                multiline
                rows={4}
                fullWidth
                value={formData.memo}
                onChange={(e) => handleChange('memo', e.target.value)}
                placeholder="기타 요청사항이 있으시면 입력해주세요"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ mt: 2, py: 1.5 }}
              >
                {loading ? '예약 중...' : '예약하기'}
              </Button>
            </Stack>
          </form>
            </>
          )}

          {/* 예약 조회 탭 */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                예약 시 입력하신 전화번호 또는 이메일로 예약 내역을 조회할 수 있습니다.
              </Typography>

              {lookupError && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setLookupError(null)}>
                  {lookupError}
                </Alert>
              )}

              <Stack spacing={2} sx={{ mb: 3 }}>
                <TextField
                  label="전화번호"
                  fullWidth
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  placeholder="010-1234-5678"
                />
                <TextField
                  label="이메일"
                  type="email"
                  fullWidth
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  placeholder="example@email.com"
                />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={lookupLoading}
                  onClick={handleLookup}
                  startIcon={<SearchIcon />}
                >
                  {lookupLoading ? '조회 중...' : '예약 조회'}
                </Button>
              </Stack>

              {lookupReservations.length > 0 && (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                      <TableRow>
                        <TableCell>예약일시</TableCell>
                        <TableCell>인원</TableCell>
                        <TableCell>상태</TableCell>
                        <TableCell align="center">작업</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lookupReservations.map((reservation) => (
                        <TableRow key={reservation.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {dayjs(reservation.date).format('YYYY-MM-DD')} {reservation.time}
                            </Typography>
                            {reservation.memo && (
                              <Typography variant="caption" color="text.secondary">
                                {reservation.memo}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>{reservation.people}명</TableCell>
                          <TableCell>
                            <Chip
                              label={STATUS_LABELS[reservation.status].label}
                              size="small"
                              color={STATUS_LABELS[reservation.status].color}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {reservation.status !== 'canceled' && (
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => openCancelDialog(reservation.id)}
                                title="예약 취소"
                              >
                                <CancelIcon fontSize="small" />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </Paper>

        {/* 취소 확인 다이얼로그 */}
        <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
          <DialogTitle>예약 취소</DialogTitle>
          <DialogContent>
            <DialogContentText>
              정말 이 예약을 취소하시겠습니까? 취소된 예약은 복구할 수 없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCancelDialogOpen(false)}>아니오</Button>
            <Button onClick={handleCancelReservation} color="error" autoFocus>
              예, 취소합니다
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ReservationPage;
