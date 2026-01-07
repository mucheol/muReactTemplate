import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

// 기본 헤더 컴포넌트 (모바일 우선)
export const MainHeader: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          muReactTemplate
        </Typography>
        {/* 기본 네비게이션 버튼들 (모바일에서는 작은 텍스트 버튼) */}
        <Stack direction="row" spacing={0.5} sx={{ display: 'flex' }}>
          <Button color="inherit" size="small" sx={{py: 2, '&:hover' : { bgcolor: 'transparent', color: 'black'}}} component={RouterLink} to="/">
            홈
          </Button>
          <Button color="inherit" size="small" sx={{py: 2,'&:hover' : { bgcolor: 'transparent', color: 'black' }}} component={RouterLink} to="/blog">
            블로그
          </Button>
          <Button color="inherit" size="small" sx={{py: 2,'&:hover' : { bgcolor: 'transparent', color: 'black' }}} component={RouterLink} to="/shop">
            쇼핑몰
          </Button>
          <Button color="inherit" size="small" sx={{py: 2,'&:hover' : { bgcolor: 'transparent', color: 'black' }}} component={RouterLink} to="/event">
            이벤트
          </Button>
          <Button color="inherit" size="small" sx={{py: 2,'&:hover' : { bgcolor: 'transparent', color: 'black' }}} component={RouterLink} to="/mypage">
            마이페이지
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
