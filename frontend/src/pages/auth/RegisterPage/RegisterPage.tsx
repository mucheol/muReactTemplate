import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

// 회원가입 페이지
const RegisterPage: React.FC = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          회원가입
        </Typography>
        <TextField label="이메일" type="email" fullWidth size="small" />
        <TextField label="비밀번호" type="password" fullWidth size="small" />
        <TextField label="비밀번호 확인" type="password" fullWidth size="small" />
        <TextField label="이름" fullWidth size="small" />
        <Button variant="contained" color="primary" fullWidth>
          회원가입
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
