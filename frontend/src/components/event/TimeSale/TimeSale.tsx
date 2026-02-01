import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Grid,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface TimeSaleProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  maxStock: number;
  imageUrl?: string;
}

interface TimeSaleProps {
  products: TimeSaleProduct[];
  endTime: string;
}

export const TimeSale: React.FC<TimeSaleProps> = ({ products, endTime }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const getStockPercentage = (stock: number, maxStock: number) => {
    return ((maxStock - stock) / maxStock) * 100;
  };

  return (
    <Box>
      {/* 타이머 */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: 'error.main',
          color: 'white',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <LocalFireDepartmentIcon sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            타임세일 마감까지
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              {String(timeLeft.hours).padStart(2, '0')}
            </Typography>
            <Typography variant="caption">시간</Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            :
          </Typography>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </Typography>
            <Typography variant="caption">분</Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            :
          </Typography>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </Typography>
            <Typography variant="caption">초</Typography>
          </Box>
        </Box>
      </Box>

      {/* 상품 목록 */}
      <Box sx={{
        width: { xs: '80%', sm: '100%' },
        mx: 'auto'
      }}>
        <Grid container spacing={3}>
          {products.map((product) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            const stockPercentage = getStockPercentage(product.stock, product.maxStock);
            const isLowStock = product.stock < product.maxStock * 0.2;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* 할인율 배지 */}
                <Chip
                  icon={<LocalFireDepartmentIcon />}
                  label={`${discount}%`}
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 1,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                />

                {/* 품절 임박 배지 */}
                {isLowStock && product.stock > 0 && (
                  <Chip
                    label="품절 임박"
                    color="warning"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      fontWeight: 'bold',
                    }}
                  />
                )}

                {/* 품절 배지 */}
                {product.stock === 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      SOLD OUT
                    </Typography>
                  </Box>
                )}

                {/* 상품 이미지 */}
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

                {/* 상품 정보 */}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                    {product.brand}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* 재고 현황 */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        재고
                      </Typography>
                      <Typography variant="caption" color={isLowStock ? 'error' : 'text.secondary'}>
                        {product.stock}/{product.maxStock}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stockPercentage}
                      color={isLowStock ? 'error' : 'primary'}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through', mb: 0.5 }}
                    >
                      {product.originalPrice.toLocaleString()}원
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main', mb: 1 }}>
                      {product.price.toLocaleString()}원
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddShoppingCartIcon />}
                      disabled={product.stock === 0}
                      color="error"
                    >
                      {product.stock === 0 ? '품절' : '구매하기'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default TimeSale;
