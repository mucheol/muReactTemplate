import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Chip,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { eventApi, type EventItem, type EventStatusFilter } from '../../../../modules/event';

type EventCategory = 'all' | 'discount' | 'coupon' | 'prize' | 'promotion' | 'attendance' | 'timesale' | 'quiz' | 'stamp';

const EVENT_CATEGORIES: { label: string; value: EventCategory }[] = [
  { label: '전체', value: 'all' },
  { label: '할인', value: 'discount' },
  { label: '쿠폰', value: 'coupon' },
  { label: '경품', value: 'prize' },
  { label: '기획전', value: 'promotion' },
  { label: '출석체크', value: 'attendance' },
  { label: '타임세일', value: 'timesale' },
  { label: '퀴즈', value: 'quiz' },
  { label: '스탬프', value: 'stamp' },
];

const getEventStatus = (event: EventItem): 'ongoing' | 'imminent' | 'ended' => {
  const now = dayjs();
  const start = dayjs(event.startDate);
  const end = dayjs(event.endDate);

  if (now.isAfter(end)) return 'ended';
  if (now.isBefore(start)) return 'ongoing'; // 단순화: 아직 시작 전도 진행 예정으로 처리
  const diffDays = end.diff(now, 'day');

  if (diffDays <= 1) return 'imminent';
  return 'ongoing';
};

const getDDayLabel = (event: EventItem) => {
  const now = dayjs();
  const end = dayjs(event.endDate);
  const diff = end.startOf('day').diff(now.startOf('day'), 'day');

  if (diff < 0) return '종료';
  if (diff === 0) return 'D-Day';
  return `D-${diff}`;
};


const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>('all');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params: { status?: EventStatusFilter; category?: string } = {};

        if (statusFilter !== 'all') {
          params.status = statusFilter;
        }

        if (categoryFilter !== 'all') {
          params.category = categoryFilter;
        }

        const response = await eventApi.getEvents(params);
        setEvents(response.data);
      } catch (error) {
        console.error('이벤트 로딩 실패:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [statusFilter, categoryFilter]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 헤더 영역 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          이벤트
        </Typography>
        <Typography variant="body2" color="text.secondary">
          진행 중인 다양한 이벤트를 만나보세요.
        </Typography>
      </Box>

      {/* 진행중 / 종료 탭 */}
      <Box sx={{ mb: 2, overflow: 'visible' }}>
        <Tabs
          value={statusFilter}
          onChange={(_, value) => setStatusFilter(value)}
          sx={{
            '& .MuiTab-root': { fontSize: 14, minHeight: 40 },
            '& .MuiTab-root:focus': { outline: 'none' },
            '& .MuiTab-root.Mui-focusVisible': { outline: 'none' },
          }}
        >
          <Tab label="전체" value="all" sx={{ border:'none'}}/>
          <Tab label="진행중" value="ongoing" sx={{ border:'none'}}/>
          <Tab label="종료된 이벤트" value="ended" sx={{ border:'none'}}/>
        </Tabs>
      </Box>

      {/* 카테고리 필터 */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {EVENT_CATEGORIES.map((cat) => (
            <Chip
              key={cat.value}
              label={cat.label}
              clickable
              color={categoryFilter === cat.value ? 'primary' : 'default'}
              variant={categoryFilter === cat.value ? 'filled' : 'outlined'}
              onClick={() => setCategoryFilter(cat.value)}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>

      {/* 이벤트 카드 그리드 */}
      {events.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {events.map((event: EventItem) => {
            const status = getEventStatus(event);
            const dday = getDDayLabel(event);

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
              <Card
                key={event.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                // 이벤트 ID로 상세 페이지 이동
                onClick={() => navigate(`/event/${event.id}`)}
              >
                {/* 썸네일 배너 */}
                <CardMedia
                  component="div"
                  sx={{
                    pt: '40%', // 배너형 비율
                    bgcolor: 'grey.200',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      이벤트 배너 이미지
                    </Typography>
                  </Box>
                  {/* 상태 뱃지 */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
                    <Chip
                      label={statusLabel}
                      size="small"
                      color={statusColor}
                      sx={{ fontSize: 11, height: 22 }}
                    />
                    <Chip
                      label={dday}
                      size="small"
                      color={status === 'ended' ? 'default' : 'primary'}
                      sx={{ fontSize: 11, height: 22 }}
                    />
                  </Box>
                </CardMedia>

                {/* 내용 */}
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {EVENT_CATEGORIES.find((c) => c.value === event.category)?.label ?? '이벤트'}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {event.title}
                  </Typography>
                  {event.subtitle && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.subtitle}
                    </Typography>
                  )}

                  {/* 진행 기간 */}
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {dayjs(event.startDate).format('YYYY.MM.DD')} ~{' '}
                    {dayjs(event.endDate).format('YYYY.MM.DD')}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            해당 조건의 이벤트가 없습니다.
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => setStatusFilter('all')}>
            전체 이벤트 보기
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default EventPage;