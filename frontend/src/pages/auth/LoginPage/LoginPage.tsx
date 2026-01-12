import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          로그인
        </Typography>
        <TextField label="이메일" type="email" fullWidth size="small" />
        <TextField label="비밀번호" type="password" fullWidth size="small" />
        <Button variant="contained" color="primary" fullWidth>
          로그인
        </Button>
        <Button variant="text" color="primary" size="small">
          비밀번호를 잊으셨나요?
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
