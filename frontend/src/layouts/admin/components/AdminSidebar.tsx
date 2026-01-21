import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const SIDEBAR_WIDTH = 240;

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { label: '홈', path: '/admin/home', icon: <HomeIcon /> },
  { label: '대시보드', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { label: '블로그 관리', path: '/admin/blog', icon: <ArticleIcon /> },
  { label: '쇼핑몰 관리', path: '/admin/shop', icon: <ShoppingCartIcon /> },
  { label: '이벤트 관리', path: '/admin/event', icon: <EventIcon /> },
  { label: 'FAQ 관리', path: '/admin/faq', icon: <HelpIcon /> },
  { label: '예약 관리', path: '/admin/reservation', icon: <BookOnlineIcon /> },
];

/**
 * 관리자 사이드바 메뉴
 */
export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          mt: '64px', // AppBar 높이만큼 내리기
          height: 'calc(100vh - 64px)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};
