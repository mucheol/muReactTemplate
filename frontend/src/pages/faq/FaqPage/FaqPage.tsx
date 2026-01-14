import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const FaqPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FAQ
        </Typography>
        <Typography variant="body1" color="text.secondary">
          자주 묻는 질문 페이지입니다. (준비 중)
        </Typography>
      </Box>
    </Container>
  );
};

export default FaqPage;
