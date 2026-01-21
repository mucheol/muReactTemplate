import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

const PromotionEventDetailPage = () => {
  const navigate = useNavigate();
  const startDate = dayjs().subtract(2, 'day');
  const endDate = dayjs().add(10, 'day');
  const diff = endDate.startOf('day').diff(dayjs().startOf('day'), 'day');
  const dDayLabel = diff < 0 ? '종료' : diff === 0 ? 'D-Day' : `D-${diff}`;

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/* 뒤로가기 버튼 */}
      <Box sx={{ mb: 2 }}>
        <Button
          size="small"
          variant="text"
          onClick={() => navigate(-1)}
        >
          ← 이벤트 목록으로
        </Button>
      </Box>
      {/* 상단 배너 (풀 와이드 기획전 이미지) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pt: '40%',
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
            기획전 메인 배너 이미지
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
          <Chip label="기획전" color="primary" size="small" />
          <Chip label={dDayLabel} color="secondary" size="small" />
        </Box>
      </Box>

      {/* 타이틀 영역 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          MD 추천 기획전
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          카테고리별 MD가 엄선한 추천 상품을 한 번에 만나보세요.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {startDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
        </Typography>
      </Box>

      {/* 본문: 기획전 설명 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          기획전 소개
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          이번 기획전은 카테고리별 MD가 직접 선정한 추천 상품들을 모았습니다. 트렌디한
          신상품부터 재구매율이 높은 스테디셀러까지, 놓치면 아쉬운 아이템들을 한 번에
          확인해보세요.
        </Typography>
      </Box>

      {/* 참여 방법 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          참여 방법
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body2">1. 아래 기획전 상품 리스트를 확인합니다.</Typography>
          <Typography variant="body2">
            2. 관심 있는 상품을 클릭하여 상세 페이지에서 장바구니에 담습니다.
          </Typography>
          <Typography variant="body2">
            3. 일부 상품은 기획전 전용 혜택(할인/적립금)이 추가로 제공될 수 있습니다.
          </Typography>
        </Stack>
      </Box>

      {/* 관련 상품 추천 영역 (목업) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          추천 상품
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Box
              key={idx}
              sx={{
                p: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.200',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  pt: '100%',
                  bgcolor: 'grey.100',
                  mb: 1,
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
                  <Typography variant="caption" color="text.secondary">
                    상품 이미지
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  mb: 0.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                추천 상품 {idx + 1}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                기획전 전용 혜택 제공
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 참여 영역 */}
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          기획전 전체 상품 보기
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 유의사항 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          유의사항
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          · 기획전 내 상품별 혜택(가격, 적립금 등)은 각 상품 상세 페이지를 참고해 주세요.
          <br />
          · 일부 상품은 재고 상황에 따라 조기 품절될 수 있습니다.
          <br />
          · 기획전 기간 동안만 제공되는 한정 혜택이 포함될 수 있습니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default PromotionEventDetailPage;