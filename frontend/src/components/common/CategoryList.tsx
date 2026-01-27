import { Box, Stack, Typography } from '@mui/material';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
  isActive?: (category: string) => boolean;
}

/**
 * 카테고리 목록 컴포넌트 (범용)
 *
 * 클릭 가능한 카테고리 목록을 표시합니다.
 */
export const CategoryList = ({
  categories,
  selectedCategory,
  onCategoryClick,
  isActive,
}: CategoryListProps) => {
  const checkActive = (category: string) => {
    if (isActive) return isActive(category);
    return selectedCategory === category;
  };

  return (
    <Stack spacing={1}>
      {categories.map((category) => (
        <Box
          key={category}
          onClick={() => onCategoryClick(category)}
          sx={{
            py: 1,
            px: 2,
            bgcolor: checkActive(category) ? 'primary.light' : 'grey.50',
            color: checkActive(category) ? 'primary.contrastText' : 'text.primary',
            borderRadius: 1,
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: checkActive(category) ? 'primary.main' : 'grey.100',
            },
          }}
        >
          <Typography variant="body2">{category}</Typography>
        </Box>
      ))}
    </Stack>
  );
};
