import React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// 기본 MUI 테마 (추후 styles/theme/theme.ts로 분리 가능)
const baseTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// MUI ThemeProvider를 감싸는 전역 테마 설정 컴포넌트
export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
