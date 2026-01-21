import React from 'react';
import { Box, Container } from '@mui/material';
import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar } from './components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * 관리자 페이지 레이아웃
 * - 관리자 전용 헤더
 * - 사이드바 메뉴
 * - 메인 컨텐츠 영역
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* 관리자 헤더 */}
      <AdminHeader />

      {/* 사이드바 + 메인 컨텐츠 */}
      <Box display="flex" flexGrow={1}>
        {/* 사이드바 */}
        <AdminSidebar />

        {/* 메인 컨텐츠 */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'grey.50',
            p: 3,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    </Box>
  );
};
