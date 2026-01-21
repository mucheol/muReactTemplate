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

const DiscountEventDetailPage = () => {
  const navigate = useNavigate();
  const startDate = dayjs().subtract(3, 'day');
  const endDate = dayjs().add(5, 'day');
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
            할인 행사 메인 배너 이미지
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
          <Chip label="할인 행사" color="primary" size="small" />
          <Chip label={dDayLabel} color="secondary" size="small" />
        </Box>
      </Box>

      {/* 타이틀 영역 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          봄맞이 대규모 할인 기획전
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          전 카테고리 최대 50% 할인, 지금이 가장 저렴한 시기!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {startDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
        </Typography>
      </Box>

      {/* 카운트다운/긴급성 */}
      <Box sx={{ mb: 4, p: 2, borderRadius: 2, bgcolor: 'error.50' }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
          마감 임박! 남은 기간 {diff >= 0 ? `${diff}일` : '0일'}입니다.
        </Typography>
      </Box>

      {/* 본문: 이벤트 설명 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          이벤트 안내
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          봄 시즌을 맞아 인기 카테고리 상품을 최대 50%까지 할인하는 대규모 기획전입니다.
          시즌 베스트 상품과 재구매율이 높은 스테디셀러를 합리적인 가격으로 만나보세요.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          일부 한정 수량 상품의 경우 조기 품절될 수 있으며, 이벤트 기간 중에도 재고
          상황에 따라 혜택이 변경될 수 있습니다.
        </Typography>
      </Box>

      {/* 참여 방법 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          참여 방법
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body2">1. 로그인 후 쇼핑몰에 접속합니다.</Typography>
          <Typography variant="body2">
            2. 할인 기획전 영역에서 관심 있는 카테고리를 선택합니다.
          </Typography>
          <Typography variant="body2">
            3. 할인 배지가 표시된 상품을 장바구니에 담고 결제하면 자동으로 할인 혜택이
            적용됩니다.
          </Typography>
        </Stack>
      </Box>

      {/* 혜택 소개 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          혜택 안내
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body2">· 최대 50% 할인 (카테고리별 상이)</Typography>
          <Typography variant="body2">· 일부 상품 추가 적립금 지급</Typography>
          <Typography variant="body2">· 특정 금액 이상 구매 시 무료배송 혜택</Typography>
        </Stack>
      </Box>

      {/* 참여 영역 */}
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          할인 상품 바로 보러가기
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 유의사항/약관 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          유의사항
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          · 이벤트 기간, 혜택 내용은 당사 사정에 따라 예고 없이 변경 또는 조기 종료될 수
          있습니다.
          <br />
          · 일부 브랜드/상품은 할인 대상에서 제외될 수 있습니다.
          <br />
          · 다른 쿠폰 및 프로모션과 중복 적용이 불가할 수 있습니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default DiscountEventDetailPage;