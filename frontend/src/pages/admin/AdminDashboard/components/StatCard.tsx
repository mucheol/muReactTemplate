import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  color: 'primary' | 'success' | 'warning' | 'info';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, color }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        borderTop: '3px solid',
        borderTopColor: `${color}.main`,
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography>
        <Typography variant="caption" color={`${color}.main`}>
          {change}
        </Typography>
      </CardContent>
    </Card>
  );
};
