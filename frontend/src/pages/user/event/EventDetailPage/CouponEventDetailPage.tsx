import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

const CouponEventDetailPage = () => {
  const navigate = useNavigate();
  const startDate = dayjs().subtract(1, 'day');
  const endDate = dayjs().add(7, 'day');
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
            쿠폰 이벤트 메인 배너 이미지
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
          <Chip label="쿠폰 이벤트" color="primary" size="small" />
          <Chip label={dDayLabel} color="secondary" size="small" />
        </Box>
      </Box>

      {/* 타이틀 영역 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          신규 가입 감사 쿠폰 이벤트
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          첫 구매 시 사용 가능한 10,000원 할인 쿠폰을 드립니다.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {startDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
        </Typography>
      </Box>

      {/* 본문: 이벤트 설명 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          이벤트 안내
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          회원가입 후 첫 구매를 하시는 모든 고객님께 10,000원 할인 쿠폰을 드립니다.
          발급된 쿠폰은 마이페이지 &gt; 쿠폰함에서 확인하실 수 있습니다.
        </Typography>
      </Box>

      {/* 참여 방법 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          참여 방법
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body2">1. 회원가입 또는 로그인합니다.</Typography>
          <Typography variant="body2">2. 아래 버튼을 눌러 쿠폰을 발급받습니다.</Typography>
          <Typography variant="body2">
            3. 상품 결제 시 쿠폰을 선택하여 할인 혜택을 적용합니다.
          </Typography>
        </Stack>
      </Box>

      {/* 쿠폰 코드/다운로드 영역 (목업) */}
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

      {/* 참여 영역: 바로 사용하러 가기 */}
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          지금 쿠폰 사용하러 가기
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 유의사항 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          유의사항
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          · 쿠폰은 발급일로부터 7일 이내에만 사용 가능합니다.
          <br />
          · 일부 카테고리/브랜드는 쿠폰 적용 대상에서 제외될 수 있습니다.
          <br />
          · 다른 쿠폰 및 프로모션과 중복 사용이 제한될 수 있습니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default CouponEventDetailPage;