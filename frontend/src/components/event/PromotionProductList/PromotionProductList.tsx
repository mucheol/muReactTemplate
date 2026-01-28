import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface PromotionProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  category: string;
}

interface PromotionSection {
  id: string;
  title: string;
  products: PromotionProduct[];
}

interface PromotionProductListProps {
  sections: PromotionSection[];
}

export const PromotionProductList: React.FC<PromotionProductListProps> = ({ sections }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const sectionId = sections[newValue].id;
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = isFixed ? 120 : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <Box>
      {/* Fixed Tabs */}
      <Box
        sx={{
          position: isFixed ? 'fixed' : 'relative',
          top: isFixed ? 64 : 0,
          left: 0,
          right: 0,
          zIndex: 999,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: isFixed ? 2 : 0,
          transition: 'all 0.3s',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            maxWidth: 'lg',
            mx: 'auto',
            px: 2,
          }}
        >
          {sections.map((section) => (
            <Tab key={section.id} label={section.title} />
          ))}
        </Tabs>
      </Box>

      {/* Spacer for fixed tabs */}
      {isFixed && <Box sx={{ height: 48 }} />}

      {/* Product Sections */}
      <Box sx={{ mt: 4 }}>
        {sections.map((section) => (
          <Box
            key={section.id}
            id={`section-${section.id}`}
            sx={{ mb: 6, scrollMarginTop: isFixed ? '120px' : '80px' }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, px: 2 }}>
              {section.title}
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 3,
                px: 2,
              }}
            >
              {section.products.map((product) => {
                const discount = calculateDiscount(product.price, product.originalPrice);

                return (
                  <Card
                    key={product.id}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    {/* 상품 이미지 */}
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        sx={{
                          height: 200,
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {product.name}
                        </Typography>
                      </CardMedia>

                      {/* 할인율 배지 */}
                      {discount > 0 && (
                        <Chip
                          label={`${discount}%`}
                          color="error"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                    </Box>

                    {/* 상품 정보 */}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {product.brand}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Box sx={{ mt: 'auto' }}>
                        {product.originalPrice && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through', mb: 0.5 }}
                          >
                            {product.originalPrice.toLocaleString()}원
                          </Typography>
                        )}
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                        >
                          {product.price.toLocaleString()}원
                        </Typography>

                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<AddShoppingCartIcon />}
                          size="small"
                        >
                          장바구니
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PromotionProductList;
