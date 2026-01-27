import { Box, Chip, Stack } from '@mui/material';

interface CategoryTabsProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
  hasSearchQuery?: boolean;
}

export const CategoryTabs = ({
  categories,
  selectedCategory,
  onCategoryClick,
  hasSearchQuery = false,
}: CategoryTabsProps) => {
  return (
    <Box
      sx={{
        mb: 3,
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Stack direction="row" spacing={1}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => onCategoryClick(category)}
            color={selectedCategory === category && !hasSearchQuery ? 'primary' : 'default'}
            variant={selectedCategory === category && !hasSearchQuery ? 'filled' : 'outlined'}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>
    </Box>
  );
};
