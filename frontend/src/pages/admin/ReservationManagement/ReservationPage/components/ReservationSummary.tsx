import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface ReservationSummaryProps {
  total: number;
  confirmed: number;
  pending: number;
  canceled: number;
}

export const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  total,
  confirmed,
  pending,
  canceled,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
        gap: 2,
        mb: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            전체 예약
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {total.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            확정
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {confirmed.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            대기
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {pending.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            취소
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {canceled.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
