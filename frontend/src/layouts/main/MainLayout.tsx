import React from 'react';
import { Box, Container } from '@mui/material';
import { MainHeader } from '../../components/navigation/MainHeader';
import { MainFooter } from '../../components/navigation/MainFooter';

// 기본 레이아웃: 공통 헤더/푸터를 포함하는 레이아웃
export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MainHeader />
      <Container component="main" sx={{ flexGrow: 1, py: 2 }}>
        {children}
      </Container>
      <MainFooter />
    </Box>
  );
};
