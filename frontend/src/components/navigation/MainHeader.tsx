import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Box } from '@mui/material';
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
  py:1,
  '&:hover': { bgcolor: 'transparent', color: 'black' },
} as const;

export const MainHeader: React.FC = () => {
  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 1 }}>
      {/* 1줄: 상단 로고 + 햄버거 바 */}
      <Box
        sx={{
          position: 'relative',
          px: 2,
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 좌측 상단 햄버거 버튼 */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
        >
          <MenuIcon />
        </IconButton>

        {/* 가운데 로고/타이틀 (텍스트 길이와 상관없이 중앙 정렬) */}
        <Typography
          variant="h6"
          component="div"
          sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          muReactTemplate
        </Typography>
      </Box>

      {/* 2줄: 네비게이션 */}
      <Toolbar
        sx={{
          gap: 1,
          minHeight: 30,
          px:0,
        }}
      >
        {/* 가로 스크롤 가능한 네비게이션 영역 */}
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: 'inline-flex',
            }}
          >
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
        </Box>
      </Toolbar>

      {/* 3줄: 하단 인증 버튼 줄 */}
      <Box
        sx={{
          px: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 0.5,
          backgroundColor: 'background.paper',
          
        }}
      >
        <Button
          color="inherit"
          size="small"
          component={RouterLink}
          to="/login"
          sx={{ minWidth: 'auto', fontSize: 12, textTransform: 'none', color: 'primary.main' }}
        >
          로그인
        </Button>
        <Button
          color="inherit"
          size="small"
          component={RouterLink}
          to="/register"
          sx={{ minWidth: 'auto', fontSize: 12, textTransform: 'none', color: 'primary.main' }}
        >
          회원가입
        </Button>
      </Box>
    </AppBar>
  );
};