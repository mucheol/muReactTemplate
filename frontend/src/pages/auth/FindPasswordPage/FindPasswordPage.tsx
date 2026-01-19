import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Alert,
} from '@mui/material';

const FindPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동해서 비밀번호 재설정 메일 발송
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        bgcolor: 'grey.50',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'background.paper',
          }}
        >
          {/* 헤더 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1 }}>
              ACCOUNT
            </Typography>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
              비밀번호 찾기
            </Typography>
            <Typography variant="body2" color="text.secondary">
              가입 시 사용한 이메일 주소를 입력하시면,
              비밀번호 재설정 링크를 보내드립니다.
            </Typography>
          </Box>

          {/* 안내 메시지 */}
          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              입력하신 이메일 주소로 비밀번호 재설정 링크를 발송했습니다.
              메일함(스팸 메일함 포함)을 확인해 주세요.
            </Alert>
          )}

          {/* 폼 */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <TextField
                label="이메일 주소"
                type="email"
                required
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!email}
                sx={{ py: 1 }}
              >
                비밀번호 재설정 링크 보내기
              </Button>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  계정을 찾으셨나요?
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* TODO: 실제 라우트에 맞춰 href 수정 */}
                  <Link href="/auth/login" variant="body2" underline="hover">
                    로그인
                  </Link>
                  <Link href="/auth/signup" variant="body2" underline="hover">
                    회원가입
                  </Link>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* 추가 안내 */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              이메일을 받지 못하셨나요? 입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
              그래도 문제가 지속되면 고객센터로 문의해 주세요.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FindPasswordPage;
