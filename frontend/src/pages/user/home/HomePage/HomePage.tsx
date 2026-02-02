import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { blogApi, type BlogPost } from '../../../../modules/blog';
import { eventApi, type EventItem } from '../../../../modules/event';
import dayjs from 'dayjs';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [activeEvents, setActiveEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 최근 블로그 포스트 3개 가져오기
      const blogResponse = await blogApi.getPosts();
      setRecentPosts(blogResponse.data.slice(0, 3));

      // 진행 중인 이벤트 가져오기
      const eventResponse = await eventApi.getEvents();
      const now = dayjs();
      const active = eventResponse.data.filter(
        (event) => dayjs(event.startDate).isBefore(now) && dayjs(event.endDate).isAfter(now)
      ).slice(0, 2);
      setActiveEvents(active);
    } catch (err) {
      console.error('데이터 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: <ArticleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: '블로그',
      description: '다양한 주제의 유익한 글을 만나보세요',
      path: '/blog',
    },
    {
      icon: <StorefrontIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      title: '쇼핑몰',
      description: '엄선된 상품을 합리적인 가격으로',
      path: '/shop',
    },
    {
      icon: <EventIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
      title: '이벤트',
      description: '특별한 혜택과 재미있는 이벤트',
      path: '/event',
    },
    {
      icon: <CalendarMonthIcon sx={{ fontSize: 48, color: 'error.main' }} />,
      title: '예약',
      description: '간편하게 예약하고 확인하세요',
      path: '/reservation',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* 히어로 섹션 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
            }}
          >
            muReactTemplate
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.5rem' },
            }}
          >
            React와 함께하는 모던 웹 경험
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
              onClick={() => navigate('/blog')}
            >
              블로그 둘러보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
              onClick={() => navigate('/shop')}
            >
              쇼핑하러 가기
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 주요 서비스 */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
          서비스
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, textAlign: 'center' }}
        >
          다양한 서비스를 한곳에서 이용하세요
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => navigate(service.path)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 최신 블로그 */}
      {!loading && recentPosts.length > 0 && (
        <Box sx={{ bgcolor: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  최신 블로그
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  새로운 소식과 유익한 정보
                </Typography>
              </Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/blog')}
              >
                더보기
              </Button>
            </Stack>

            <Grid container spacing={3}>
              {recentPosts.map((post) => (
                <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
                    }}
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    {post.thumbnail && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.thumbnail}
                        alt={post.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip label={post.category} size="small" />
                        <Typography variant="caption" color="text.secondary">
                          {dayjs(post.date).format('YYYY.MM.DD')}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* 진행 중인 이벤트 */}
      {!loading && activeEvents.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                진행 중인 이벤트
              </Typography>
              <Typography variant="body1" color="text.secondary">
                놓치지 마세요!
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/event')}
            >
              전체보기
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {activeEvents.map((event) => (
              <Grid key={event.id} size={{ xs: 12, md: 6 }}>
                <Paper
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { boxShadow: 4 },
                  }}
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <Stack direction="row" spacing={2}>
                    {event.thumbnailUrl && (
                      <Box
                        component="img"
                        src={event.thumbnailUrl}
                        alt={event.title}
                        sx={{
                          width: 120,
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                      />
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                      <Chip
                        label="진행중"
                        size="small"
                        color="success"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {dayjs(event.startDate).format('YYYY.MM.DD')} ~{' '}
                        {dayjs(event.endDate).format('YYYY.MM.DD')}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {event.subtitle || event.content}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* FAQ 배너 */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <HelpOutlineIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  궁금한 점이 있으신가요?
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  자주 묻는 질문에서 답을 찾아보세요
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
              onClick={() => navigate('/faq')}
            >
              FAQ 보기
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
