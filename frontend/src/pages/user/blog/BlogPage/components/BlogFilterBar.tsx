import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

interface BlogFilterBarProps {
  filterLabel: string | null;
  filteredCount: number;
  onClearFilter: () => void;
}

/**
 * 블로그 필터 상태 표시 바
 */
export const BlogFilterBar: React.FC<BlogFilterBarProps> = ({
  filterLabel,
  filteredCount,
  onClearFilter,
}) => {
  if (!filterLabel) return null;

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        label={filterLabel}
        onDelete={onClearFilter}
        color="primary"
        variant="outlined"
      />
      <Typography variant="body2" color="text.secondary">
        {filteredCount}개의 포스트
      </Typography>
    </Box>
  );
};
