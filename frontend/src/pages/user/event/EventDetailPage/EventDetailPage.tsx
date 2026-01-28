import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  TextField,
  Alert,
} from '@mui/material';
import dayjs from 'dayjs';
import { eventApi, type EventItem, type PrizeItem } from '../../../../modules/event';
import PrizeWheel from '../../../../components/event/PrizeWheel/PrizeWheel';
import LadderGame from '../../../../components/event/LadderGame/LadderGame';
import PromotionProductList from '../../../../components/event/PromotionProductList/PromotionProductList';
import AttendanceCheck from '../../../../components/event/AttendanceCheck/AttendanceCheck';
import TimeSale from '../../../../components/event/TimeSale/TimeSale';
import QuizEvent from '../../../../components/event/QuizEvent/QuizEvent';
import StampRally from '../../../../components/event/StampRally/StampRally';

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);

  const handlePrizeWon = (prize: PrizeItem) => {
    setWonPrize(prize);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await eventApi.getEvent(Number(id));
        setEvent(response.data);
      } catch (error) {
        console.error('이벤트 로딩 실패:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          이벤트를 찾을 수 없습니다.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/event')}>
          이벤트 목록으로
        </Button>
      </Container>
    );
  }

  const startDate = dayjs(event.startDate);
  const endDate = dayjs(event.endDate);
  const diff = endDate.startOf('day').diff(dayjs().startOf('day'), 'day');
  const dDayLabel = diff < 0 ? '종료' : diff === 0 ? 'D-Day' : `D-${diff}`;

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'discount':
        return '할인 행사';
      case 'coupon':
        return '쿠폰 이벤트';
      case 'prize':
        return '경품 추첨';
      case 'promotion':
        return '기획전';
      default:
        return '이벤트';
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/* 뒤로가기 버튼 */}
      <Box sx={{ mb: 2 }}>
        <Button size="small" variant="text" onClick={() => navigate(-1)}>
          ← 이벤트 목록으로
        </Button>
      </Box>

      {/* 상단 배너 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pt: '35%',
          bgcolor: 'grey.200',
          mb: 3,
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
          <Typography variant="h5" color="text.secondary">
            {getCategoryLabel(event.category)} 메인 배너 이미지
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
          <Chip label={getCategoryLabel(event.category)} color="primary" size="small" />
          <Chip label={dDayLabel} color="secondary" size="small" />
        </Box>
      </Box>

      {/* 타이틀 영역 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {event.title}
        </Typography>
        {event.subtitle && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {event.subtitle}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {startDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
        </Typography>
      </Box>

      {/* 카운트다운/긴급성 (진행중인 이벤트만) */}
      {diff >= 0 && diff <= 3 && (
        <Box sx={{ mb: 4, p: 2, borderRadius: 2, bgcolor: 'error.50' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
            마감 임박! 남은 기간 {diff}일입니다.
          </Typography>
        </Box>
      )}

      {/* 본문: 이벤트 설명 */}
      {event.content && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            이벤트 안내
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {event.content}
          </Typography>
        </Box>
      )}

      {/* 참여 방법 */}
      {event.howToParticipate && event.howToParticipate.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            참여 방법
          </Typography>
          <Stack spacing={1.5}>
            {event.howToParticipate.map((step: string, index: number) => (
              <Typography key={index} variant="body2">
                {index + 1}. {step}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}

      {/* 혜택 소개 */}
      {event.benefits && event.benefits.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            혜택 안내
          </Typography>
          <Stack spacing={1.5}>
            {event.benefits.map((benefit: string, index: number) => (
              <Typography key={index} variant="body2">
                · {benefit}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}

      {/* 쿠폰 코드 영역 (쿠폰 이벤트만) */}
      {event.category === 'coupon' && (
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            bgcolor: 'grey.50',
            border: '1px dashed',
            borderColor: 'grey.300',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            쿠폰 코드
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              size="small"
              value="NEW10K"
              slotProps={{ input: { readOnly: true } }}
              sx={{ maxWidth: 200 }}
            />
            <Button variant="outlined" sx={{ whiteSpace: 'nowrap' }}>
              코드 복사
            </Button>
            <Button variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }}>
              쿠폰 발급 받기
            </Button>
          </Stack>
        </Box>
      )}

      {/* 경품 추첨 영역 (경품 이벤트만) */}
      {event.category === 'prize' && event.prizeItems && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            경품 추첨하기
          </Typography>

          {wonPrize && wonPrize.name !== '꽝' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              축하합니다! <strong>{wonPrize.name}</strong>에 당첨되셨습니다! 마이페이지에서 확인하세요.
            </Alert>
          )}

          {event.prizeType === 'wheel' && (
            <PrizeWheel prizes={event.prizeItems} onPrizeWon={handlePrizeWon} />
          )}

          {event.prizeType === 'ladder' && (
            <LadderGame prizes={event.prizeItems} onPrizeWon={handlePrizeWon} />
          )}
        </Box>
      )}

      {/* 기획전 상품 목록 (기획전 이벤트만) */}
      {event.category === 'promotion' && event.promotionSections && (
        <Box sx={{ mb: 4 }}>
          <PromotionProductList sections={event.promotionSections} />
        </Box>
      )}

      {/* 출석체크 (출석 이벤트만) */}
      {event.category === 'attendance' && (
        <Box sx={{ mb: 4 }}>
          <AttendanceCheck />
        </Box>
      )}

      {/* 타임세일 (타임세일 이벤트만) */}
      {event.category === 'timesale' && event.timeSaleProducts && event.timeSaleEndTime && (
        <Box sx={{ mb: 4 }}>
          <TimeSale products={event.timeSaleProducts} endTime={event.timeSaleEndTime} />
        </Box>
      )}

      {/* 퀴즈 (퀴즈 이벤트만) */}
      {event.category === 'quiz' && event.quizQuestions && (
        <Box sx={{ mb: 4 }}>
          <QuizEvent questions={event.quizQuestions} />
        </Box>
      )}

      {/* 스탬프 투어 (스탬프 이벤트만) */}
      {event.category === 'stamp' && event.stampLocations && (
        <Box sx={{ mb: 4 }}>
          <StampRally locations={event.stampLocations} />
        </Box>
      )}

      {/* 참여 영역 (기본 이벤트만) */}
      {event.category === 'discount' && (
        <Box sx={{ mb: 4 }}>
          <Button variant="contained" color="primary" size="large" fullWidth>
            할인 상품 바로 보러가기
          </Button>
        </Box>
      )}
      {event.category === 'coupon' && (
        <Box sx={{ mb: 4 }}>
          <Button variant="contained" color="primary" size="large" fullWidth>
            지금 쿠폰 사용하러 가기
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 4 }} />

      {/* 유의사항/약관 */}
      {event.notes && event.notes.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
            유의사항
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            {event.notes.map((note: string, index: number) => (
              <Box key={index}>
                · {note}
                {index < event.notes!.length - 1 && <br />}
              </Box>
            ))}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default EventDetailPage;
