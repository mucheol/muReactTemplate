import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/**
 * 관리자 페이지 헤더
 */
export const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleExitAdmin = () => {
    // 사용자 페이지로 전환
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.dark' }}>
      <Toolbar>
        {/* 관리자 아이콘 + 타이틀 */}
        <AdminPanelSettingsIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          관리자 페이지
        </Typography>

        {/* 사용자 페이지로 나가기 버튼 */}
        <Button
          color="inherit"
          startIcon={<ExitToAppIcon />}
          onClick={handleExitAdmin}
          sx={{ ml: 2 }}
        >
          사용자 페이지로
        </Button>
      </Toolbar>
    </AppBar>
  );
};
