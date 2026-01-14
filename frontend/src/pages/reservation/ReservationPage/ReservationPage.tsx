import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ReservationPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          예약
        </Typography>
        <Typography variant="body1" color="text.secondary">
          예약 페이지입니다. (준비 중)
        </Typography>
      </Box>
    </Container>
  );
};

export default ReservationPage;
