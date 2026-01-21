import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';

/**
 * 관리자 홈 페이지
 * - 기존 HomePage를 관리자용으로 재사용
 */
const AdminHomePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        관리자 홈
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                환영합니다
              </Typography>
              <Typography variant="body2" color="text.secondary">
                관리자 페이지입니다. 좌측 메뉴에서 관리할 항목을 선택하세요.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                빠른 링크
              </Typography>
              <Typography variant="body2" color="text.secondary">
                대시보드, 컨텐츠 관리 등의 기능을 이용할 수 있습니다.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminHomePage;
