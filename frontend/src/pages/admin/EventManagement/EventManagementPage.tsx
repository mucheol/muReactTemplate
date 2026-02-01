import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { eventApi, type EventItem, type EventCategory } from '../../../modules/event';
import dayjs from 'dayjs';

const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  discount: '할인',
  coupon: '쿠폰',
  prize: '경품',
  promotion: '기획전',
  attendance: '출석체크',
  timesale: '타임세일',
  quiz: '퀴즈',
  stamp: '스탬프',
};

/**
 * 이벤트 관리 페이지
 * - 이벤트 목록 조회 및 관리
 */
const EventManagementPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventApi.getEvents();
        setEvents(response.data);
      } catch (err) {
        console.error('이벤트 조회 실패:', err);
        setError('이벤트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventStatus = (event: EventItem): 'ongoing' | 'imminent' | 'ended' => {
    const now = dayjs();
    const end = dayjs(event.endDate);

    if (now.isAfter(end)) return 'ended';
    const diffDays = end.diff(now, 'day');
    if (diffDays <= 1) return 'imminent';
    return 'ongoing';
  };

  const handleEdit = (id: number) => {
    console.log('편집:', id);
    // TODO: 편집 다이얼로그 또는 페이지 이동
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await eventApi.deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      console.error('이벤트 삭제 실패:', err);
      alert('이벤트 삭제에 실패했습니다.');
    }
  };

  const handleView = (id: number) => {
    window.open(`/event/${id}`, '_blank');
  };

  const handleAddNew = () => {
    console.log('이벤트 추가');
    // TODO: 작성 다이얼로그 또는 페이지 이동
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          이벤트 관리
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
          이벤트 추가
        </Button>
      </Stack>

      <Card>
        <CardContent>
          {/* 이벤트 목록 테이블 */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>시작일</TableCell>
                  <TableCell>종료일</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell align="center">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography color="text.secondary" sx={{ py: 4 }}>
                        등록된 이벤트가 없습니다.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => {
                    const status = getEventStatus(event);
                    let statusLabel = '진행중';
                    let statusColor: 'success' | 'warning' | 'default' = 'success';

                    if (status === 'imminent') {
                      statusLabel = '마감임박';
                      statusColor = 'warning';
                    } else if (status === 'ended') {
                      statusLabel = '종료';
                      statusColor = 'default';
                    }

                    return (
                      <TableRow key={event.id} hover>
                        <TableCell>{event.id}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {event.title}
                          </Typography>
                          {event.subtitle && (
                            <Typography variant="caption" color="text.secondary">
                              {event.subtitle}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={EVENT_CATEGORY_LABELS[event.category]}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{dayjs(event.startDate).format('YYYY.MM.DD')}</TableCell>
                        <TableCell>{dayjs(event.endDate).format('YYYY.MM.DD')}</TableCell>
                        <TableCell>
                          <Chip label={statusLabel} size="small" color={statusColor} />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <IconButton size="small" onClick={() => handleView(event.id)} title="미리보기">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleEdit(event.id)} title="편집">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(event.id)}
                              title="삭제"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventManagementPage;
