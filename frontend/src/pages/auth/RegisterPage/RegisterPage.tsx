import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { authApi } from '../../../modules/auth';

type RegisterValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

type RegisterErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  name?: string;
};

// 회원가입 페이지
const RegisterPage: React.FC = () => {
  const [values, setValues] = useState<RegisterValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof RegisterValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const next = { ...values, [field]: value };
      setValues(next);

      // 필드별 즉시 검증으로, 값이 올바르면 경고 제거
      setErrors((prev) => {
        const copy: RegisterErrors = { ...prev };

        if (field === 'email') {
          if (!value.trim()) {
            copy.email = '이메일을 입력해 주세요.';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            copy.email = '이메일 형식이 올바르지 않습니다.';
          } else {
            delete copy.email;
          }
        }

        if (field === 'password') {
          if (!value.trim()) {
            copy.password = '비밀번호를 입력해 주세요.';
          } else if (value.length < 6) {
            copy.password = '비밀번호는 6자 이상이어야 합니다.';
          } else {
            delete copy.password;
          }

          // 비밀번호가 바뀌면 확인 값도 다시 체크
          if (next.passwordConfirm) {
            if (next.password !== next.passwordConfirm) {
              copy.passwordConfirm = '비밀번호가 일치하지 않습니다.';
            } else {
              delete copy.passwordConfirm;
            }
          }
        }

        if (field === 'passwordConfirm') {
          if (!value.trim()) {
            copy.passwordConfirm = '비밀번호 확인을 입력해 주세요.';
          } else if (next.password !== value) {
            copy.passwordConfirm = '비밀번호가 일치하지 않습니다.';
          } else {
            delete copy.passwordConfirm;
          }
        }

        if (field === 'name') {
          if (!value.trim()) {
            copy.name = '이름을 입력해 주세요.';
          } else {
            delete copy.name;
          }
        }

        return copy;
      });
    };

  const validate = (vals: RegisterValues): RegisterErrors => {
    const newErrors: RegisterErrors = {};

    if (!vals.email.trim()) {
      newErrors.email = '이메일을 입력해 주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      newErrors.email = '이메일 형식이 올바르지 않습니다.';
    }

    if (!vals.password.trim()) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    } else if (vals.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    if (!vals.passwordConfirm.trim()) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해 주세요.';
    } else if (vals.password !== vals.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!vals.name.trim()) {
      newErrors.name = '이름을 입력해 주세요.';
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
      const { email, password, name } = values;
      const response = await authApi.register({ email, password, name });
      console.log('register success', response.data);
      alert('회원가입 성공');
      // TODO: 자동 로그인이나 로그인 페이지로 이동 등 처리
    } catch (error: any) {
      console.error('register error', error);
      alert(error?.response?.data?.message ?? '회원가입에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const hasError = Object.keys(errors).length > 0;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          회원가입
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
        <TextField
          label="비밀번호 확인"
          type="password"
          fullWidth
          size="small"
          value={values.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
          error={Boolean(errors.passwordConfirm)}
          helperText={errors.passwordConfirm}
        />
        <TextField
          label="이름"
          fullWidth
          size="small"
          value={values.name}
          onChange={handleChange('name')}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={submitting || hasError}
        >
          {submitting ? '가입 처리 중...' : '회원가입'}
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
