import React, { useMemo, useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

type EventStatusFilter = 'all' | 'ongoing' | 'ended';
type EventCategory = 'all' | 'discount' | 'coupon' | 'prize' | 'promotion';

type EventItem = {
  id: number;
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  category: EventCategory;
  startDate: string;
  endDate: string;
};

const MOCK_EVENTS: EventItem[] = [
  {
    id: 1,
    title: '봄맞이 할인 기획전',
    subtitle: '최대 50% 할인',
    thumbnailUrl: '',
    category: 'discount',
    startDate: dayjs().subtract(3, 'day').toISOString(),
    endDate: dayjs().add(5, 'day').toISOString(),
  },
  {
    id: 2,
    title: '신규 가입 쿠폰 이벤트',
    subtitle: '첫 구매 10,000원 할인',
    thumbnailUrl: '',
    category: 'coupon',
    startDate: dayjs().subtract(10, 'day').toISOString(),
    endDate: dayjs().add(1, 'day').toISOString(),
  },
  {
    id: 3,
    title: '럭키 박스 경품 추첨',
    subtitle: '아이패드, 에어팟 등 푸짐한 선물',
    thumbnailUrl: '',
    category: 'prize',
    startDate: dayjs().subtract(20, 'day').toISOString(),
    endDate: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: 4,
    title: '여름 시즌 MD 기획전',
    subtitle: 'MD가 추천하는 여름 필수템 모음',
    thumbnailUrl: '',
    category: 'promotion',
    startDate: dayjs().subtract(1, 'day').toISOString(),
    endDate: dayjs().add(10, 'day').toISOString(),
  },
];

const EVENT_CATEGORIES: { label: string; value: EventCategory }[] = [
  { label: '전체', value: 'all' },
  { label: '할인', value: 'discount' },
  { label: '쿠폰', value: 'coupon' },
  { label: '경품', value: 'prize' },
  { label: '기획전', value: 'promotion' },
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

// 카테고리별 상세 페이지 경로 매핑
const getEventDetailPath = (event: EventItem) => {
  switch (event.category) {
    case 'discount':
      return '/event/discount';
    case 'coupon':
      return '/event/coupon';
    case 'prize':
      return '/event/prize';
    case 'promotion':
      return '/event/promotion';
    default:
      return '/event';
  }
};

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>('all');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const status = getEventStatus(event);

      if (statusFilter === 'ongoing' && status === 'ended') return false;
      if (statusFilter === 'ended' && status !== 'ended') return false;

      if (categoryFilter !== 'all' && event.category !== categoryFilter) return false;

      return true;
    });
  }, [statusFilter, categoryFilter]);

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
      {filteredEvents.length > 0 ? (
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
          {filteredEvents.map((event) => {
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
                // 이벤트 성격(카테고리)에 맞는 상세 페이지로 이동
                onClick={() => navigate(getEventDetailPath(event))}
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