import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../modules/auth';

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof LoginValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const next = { ...values, [field]: value };
      setValues(next);

      // 필드별 간단 재검증
      setErrors((prev) => {
        const copy = { ...prev };
        if (field === 'email') {
          if (!value.trim()) {
            copy.email = '이메일을 입력해 주세요.';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            copy.email = '이메일 형식이 올바르지 않습니다.';
          } else {
            delete copy.email;            // 형식이 올바르면 에러 제거
          }
        }
        if (field === 'password') {
          if (!value.trim()) {
            copy.password = '비밀번호를 입력해 주세요.';
          } else {
            delete copy.password;
          }
        }
        return copy;
      });
    };

  const validate = (vals: LoginValues): LoginErrors => {
    const newErrors: LoginErrors = {};

    if (!vals.email.trim()) {
      newErrors.email = '이메일을 입력해 주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      newErrors.email = '이메일 형식이 올바르지 않습니다.';
    }

    if (!vals.password.trim()) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate(values);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await authApi.login(values);
      console.log('login success', response.data);

      // localStorage에 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      // 같은 탭 내 컴포넌트들에게 로그인 상태 변경 알림
      window.dispatchEvent(new Event('auth-change'));

      alert('로그인 성공');
      navigate('/');
    } catch (error: any) {
      console.error('login error', error);
      alert(error?.response?.data?.message ?? '로그인에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const hasError = Object.keys(errors).length > 0;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          로그인
        </Typography>
        <TextField
          label="이메일"
          type="email"
          fullWidth
          size="small"
          value={values.email}
          onChange={handleChange('email')}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          size="small"
          value={values.password}
          onChange={handleChange('password')}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={submitting || hasError}
        >
          {submitting ? '로그인 중...' : '로그인'}
        </Button>
        <Button variant="text" color="primary" size="small">
          비밀번호를 잊으셨나요?
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
