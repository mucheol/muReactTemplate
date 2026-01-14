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

const PrizeEventDetailPage = () => {
  const navigate = useNavigate();
  const startDate = dayjs().subtract(5, 'day');
  const endDate = dayjs().add(2, 'day');
  const diff = endDate.startOf('day').diff(dayjs().startOf('day'), 'day');
  const dDayLabel = diff < 0 ? '종료' : diff === 0 ? 'D-Day' : `D-${diff}`;

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/*  뒤로가기 버튼 */}
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
            경품 이벤트 메인 배너 이미지
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
          <Chip label="경품 이벤트" color="primary" size="small" />
          <Chip label={dDayLabel} color="secondary" size="small" />
        </Box>
      </Box>

      {/* 타이틀 영역 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          럭키 박스 경품 추첨 이벤트
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          응모만 해도 푸짐한 경품의 주인공이 될 수 있는 기회!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {startDate.format('YYYY.MM.DD')} ~ {endDate.format('YYYY.MM.DD')}
        </Typography>
      </Box>

      {/* 혜택/경품 소개 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          경품 안내
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body2">· 1등: 최신 태블릿 1명</Typography>
          <Typography variant="body2">· 2등: 무선 이어폰 3명</Typography>
          <Typography variant="body2">· 3등: 쇼핑 지원금 10,000원 50명</Typography>
        </Stack>
      </Box>

      {/* 참여 방법 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          참여 방법
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body2">1. 아래 응모 폼에 정보를 입력합니다.</Typography>
          <Typography variant="body2">2. 개인정보 수집 및 이용 동의에 체크합니다.</Typography>
          <Typography variant="body2">3. 응모 완료 버튼을 누르면 참여가 완료됩니다.</Typography>
        </Stack>
      </Box>

      {/* 응모 폼 (목업) */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          borderRadius: 2,
          bgcolor: 'grey.50',
          border: '1px solid',
          borderColor: 'grey.300',
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          응모 폼
        </Typography>
        <Stack spacing={2}>
          <TextField size="small" label="이름" fullWidth />
          <TextField size="small" label="휴대폰 번호" placeholder="010-0000-0000" fullWidth />
          <TextField size="small" label="이메일" fullWidth />
          <Box>
            <Typography variant="caption" color="text.secondary">
              ※ 당첨 시 개별 연락을 드리며, 잘못된 정보 입력으로 인한 불이익은 책임지지 않습니다.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* 참여 버튼 */}
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          응모 완료하기
        </Button>
      </Box>

      {/* SNS 공유 버튼 영역 (단순 목업) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          친구에게 공유하기
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small">
            카카오톡
          </Button>
          <Button variant="outlined" size="small">
            네이버
          </Button>
          <Button variant="outlined" size="small">
            링크 복사
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 유의사항 및 당첨자 발표 안내 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          유의사항
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          · 경품 제세공과금은 당사에서 부담하며, 관련 정보 제공이 필요할 수 있습니다.
          <br />
          · 중복 응모가 확인될 경우 당첨이 취소될 수 있습니다.
          <br />
          · 당첨자 발표는 이벤트 종료 후 7일 이내에 진행됩니다.
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          당첨자 발표
        </Typography>
        <Typography variant="body2" color="text.secondary">
          이벤트 종료 후 이 페이지 하단과 공지사항을 통해 안내 예정입니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrizeEventDetailPage;