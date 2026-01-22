import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SHOP_CATEGORIES, formatPrice } from '../../data/shopData';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
  tempPriceRange: number[];
  onPriceRangeChange: (value: number[]) => void;
  onApplyPriceFilter: () => void;
  onClearFilter: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export const FilterSidebar = ({
  selectedCategory,
  onCategoryClick,
  tempPriceRange,
  onPriceRangeChange,
  onApplyPriceFilter,
  onClearFilter,
  onClose,
  isMobile = false,
}: FilterSidebarProps) => {
  return (
    <Box sx={{ width: { xs: 280, md: 240 }, p: 2 }}>
      {/* 모바일용 닫기 버튼 */}
      {isMobile && onClose && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            필터
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* 카테고리 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
          카테고리
        </Typography>
        <List dense disablePadding>
          {SHOP_CATEGORIES.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                selected={selectedCategory === category}
                onClick={() => onCategoryClick(category)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 가격 범위 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
          가격 범위
        </Typography>
        <Slider
          value={tempPriceRange}
          onChange={(_, newValue) => onPriceRangeChange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={300000}
          step={1000}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formatPrice(tempPriceRange[0])}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPrice(tempPriceRange[1])}
          </Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={onApplyPriceFilter}>
          적용
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 필터 초기화 */}
      <Button variant="outlined" fullWidth onClick={onClearFilter}>
        필터 초기화
      </Button>
    </Box>
  );
};
