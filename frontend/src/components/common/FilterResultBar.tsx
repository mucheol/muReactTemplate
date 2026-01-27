import { Box, Chip, Typography } from '@mui/material';

interface FilterResultBarProps {
  filterLabel: string | null;
  resultCount: number;
  onClearFilter: () => void;
  countLabel?: string;
}

/**
 * 필터 결과 표시 바 (범용)
 *
 * 검색, 카테고리, 태그 등의 필터가 적용되었을 때 결과를 표시합니다.
 */
export const FilterResultBar = ({
  filterLabel,
  resultCount,
  onClearFilter,
  countLabel = '개',
}: FilterResultBarProps) => {
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
        {resultCount}{countLabel}
      </Typography>
    </Box>
  );
};
