import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Stack, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// 기본 헤더 컴포넌트 (모바일 우선)
const NAV_ITEMS = [
  { label: '홈', path: '/' },
  { label: '블로그', path: '/blog' },
  { label: '쇼핑몰', path: '/shop' },
  { label: '이벤트', path: '/event' },
  { label: '대시보드', path: '/dashboard' },
  { label: 'FAQ', path: '/faq' },
  { label: '예약', path: '/reservation' },
];

const navButtonSx = {
  py:1,
  '&:hover': { bgcolor: 'transparent', color: 'black' },
} as const;

export const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (userStr && token) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userStr));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();

    // storage 이벤트 리스너 (다른 탭에서 로그인/로그아웃 시 동기화)
    window.addEventListener('storage', checkLoginStatus);
    // 같은 탭에서 로그인/로그아웃 시 동기화 (커스텀 이벤트)
    window.addEventListener('auth-change', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('auth-change', checkLoginStatus);
    };
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

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
        {isLoggedIn ? (
          // 로그인된 경우: 마이페이지, 로그아웃
          <>
            <Button
              color="inherit"
              size="small"
              component={RouterLink}
              to="/mypage"
              sx={{ minWidth: 'auto', fontSize: 12, textTransform: 'none', color: 'primary.main' }}
            >
              마이페이지
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={handleLogout}
              sx={{ minWidth: 'auto', fontSize: 12, textTransform: 'none', color: 'primary.main' }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          // 로그인 안 된 경우: 로그인, 회원가입
          <>
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
          </>
        )}
      </Box>
    </AppBar>
  );
};