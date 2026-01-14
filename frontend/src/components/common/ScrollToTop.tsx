import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// 페이지 이동 시 스크롤을 최상단으로 이동시키고, Top 버튼을 제공하는 컴포넌트
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // 페이지 이동 시 스크롤 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 스크롤 위치에 따라 버튼 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={showButton}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        aria-label="맨 위로 이동"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};
