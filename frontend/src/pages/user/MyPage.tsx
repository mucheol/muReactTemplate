import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Divider,
  Stack,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';

const MyPage: React.FC = () => {
  // TODO: 실제 로그인 사용자 정보로 교체
  const user = {
    name: '홍길동',
    email: 'user@example.com',
    role: '관리자',
    joinedAt: '2024-01-10',
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* 헤더 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1 }}>
            MY PAGE
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
            마이페이지
          </Typography>
          <Typography variant="body2" color="text.secondary">
            내 계정 정보와 비밀번호, 알림 설정을 관리할 수 있습니다.
          </Typography>
        </Box>

        {/* 프로필 + 계정 정보 */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'background.paper',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
              {user.name.charAt(0)}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                역할: {user.role} · 가입일: {user.joinedAt}
              </Typography>
            </Box>

            <Button variant="outlined" size="small">
              프로필 편집
            </Button>
          </Stack>
        </Paper>

        {/* 비밀번호 변경 */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            비밀번호 변경
          </Typography>

          <Stack spacing={2}>
            <TextField
              type="password"
              label="현재 비밀번호"
              size="small"
              fullWidth
            />
            <TextField
              type="password"
              label="새 비밀번호"
              size="small"
              fullWidth
            />
            <TextField
              type="password"
              label="새 비밀번호 확인"
              size="small"
              fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button variant="contained" size="small">
                비밀번호 변경
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* 알림 설정 */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            알림 설정
          </Typography>

          <Stack spacing={1}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="예약 관련 알림 받기"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="공지사항/서비스 안내 메일 받기"
            />
            <FormControlLabel
              control={<Switch />}
              label="마케팅/프로모션 메일 받기"
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" size="small">
              초기화
            </Button>
            <Button variant="contained" size="small">
              설정 저장
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MyPage;
