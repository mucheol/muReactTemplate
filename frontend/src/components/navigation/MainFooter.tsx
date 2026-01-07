import React from 'react';
import { Box, Typography } from '@mui/material';

// 기본 푸터 컴포넌트 (모바일 우선)
export const MainFooter: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.100', mt: 'auto' }}>
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} muReactTemplate. All rights reserved.
      </Typography>
    </Box>
  );
};
