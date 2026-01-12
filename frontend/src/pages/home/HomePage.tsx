import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

// 홈 페이지 (기본 랜딩)
const HomePage: React.FC = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          홈 템플릿 화면
        </Typography>
        <Typography variant="body2" color="text.secondary">
          이 영역에 메인 배너, 공지, 카드 리스트 등을 배치할 수 있습니다.
        </Typography>
      </Stack>
    </Box>
  );
};

export default HomePage;
