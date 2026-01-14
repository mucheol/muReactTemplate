import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          대시보드
        </Typography>
        <Typography variant="body1" color="text.secondary">
          대시보드 페이지입니다. (준비 중)
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardPage;
