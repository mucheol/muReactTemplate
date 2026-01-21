import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// 기본 헤더 컴포넌트 (모바일 우선)
const NAV_ITEMS = [
  { label: '블로그', path: '/blog' },
  { label: '쇼핑몰', path: '/shop' },
  { label: '이벤트', path: '/event' },
  { label: 'FAQ', path: '/faq' },
];

const navButtonSx = {
  py: 1,
  '&:hover': { bgcolor: 'transparent', color: 'black' },
} as const;

export const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleNavClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
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
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* 가운데 로고/타이틀 */}
          <Typography
            variant="h6"
            component="div"
            sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            muReactTemplate
          </Typography>

          {/* 우측 상단 관리자 모드 버튼 */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="admin mode"
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => navigate('/admin/home')}
            title="관리자 페이지"
          >
            <AdminPanelSettingsIcon />
          </IconButton>
        </Box>

        {/* 2줄: 네비게이션 (가로 스크롤) */}
        <Toolbar
          sx={{
            gap: 1,
            minHeight: 30,
            px: 0,
          }}
        >
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
            <>
              <Button
                color="inherit"
                size="small"
                component={RouterLink}
                to="/auth/login"
                sx={{ minWidth: 'auto', fontSize: 12, textTransform: 'none', color: 'primary.main' }}
              >
                로그인
              </Button>
              <Button
                color="inherit"
                size="small"
                component={RouterLink}
                to="/auth/register"
                sx={{ minWidth: 'auto', fontSize: 12, textTransform: 'none', color: 'primary.main' }}
              >
                회원가입
              </Button>
            </>
          )}
        </Box>
      </AppBar>

      {/* 햄버거 아이콘 → 좌측 Drawer 메뉴 */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              메뉴
            </Typography>
            {user && (
              <Typography variant="body2" color="text.secondary">
                {user.name}님
              </Typography>
            )}
          </Box>
          <Divider />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => handleNavClick(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ px: 2, py: 1 }}>
            {isLoggedIn ? (
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            ) : (
              <Stack spacing={1}>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  onClick={() => handleNavClick('/auth/login')}
                >
                  로그인
                </Button>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  onClick={() => handleNavClick('/auth/register')}
                >
                  회원가입
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};