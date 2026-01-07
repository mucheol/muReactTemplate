import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

// 기본 헤더 컴포넌트 (모바일 우선)
const NAV_ITEMS = [
  { label: '홈', path: '/' },
  { label: '블로그', path: '/blog' },
  { label: '쇼핑몰', path: '/shop' },
  { label: '이벤트', path: '/event' },
  { label: '마이페이지', path: '/mypage' },
];

const navButtonSx = {
  py: 2,
  '&:hover': { bgcolor: 'transparent', color: 'black' },
} as const;

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
        <Stack direction="row" spacing={0.5} sx={{ display: 'flex' }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              size="small"
              sx={navButtonSx}
              component={RouterLink}
              to={item.path}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};