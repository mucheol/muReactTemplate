import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../data/shopData';
import { formatPrice, getDiscountRate } from '../data/shopData';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const navigate = useNavigate();

  if (variant === 'compact') {
    return (
      <Card
        sx={{
          cursor: 'pointer',
          '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
          transition: 'all 0.2s',
        }}
        onClick={() => navigate(`/shop/${product.id}`)}
      >
        <Box
          sx={{
            position: 'relative',
            paddingTop: '70%',
            bgcolor: 'grey.200',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary" variant="caption">
              이미지
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: 30,
            }}
          >
            {product.name}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
        transition: 'all 0.2s',
      }}
      onClick={() => navigate(`/shop/${product.id}`)}
    >
      {/* 상품 이미지 */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '100%',
          bgcolor: 'grey.200',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">이미지</Typography>
        </Box>
        {/* 뱃지 */}
        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
          {product.isNew && (
            <Chip label="NEW" size="small" color="error" sx={{ height: 20, fontSize: 10 }} />
          )}
          {product.isBest && (
            <Chip label="BEST" size="small" color="warning" sx={{ height: 20, fontSize: 10 }} />
          )}
          {product.originalPrice && (
            <Chip
              label={`${getDiscountRate(product.price, product.originalPrice)}%`}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: 10 }}
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ p: 1 }}>
        {/* 카테고리 */}
        <Typography variant="caption" color="text.secondary">
          {product.category}
        </Typography>
        {/* 상품명 */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: 40,
          }}
        >
          {product.name}
        </Typography>
        {/* 가격 */}
        <Box
          sx={{
            mb: 0.5,
            position: 'relative',
            minHeight: 32,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {product.originalPrice && (
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                textDecoration: 'line-through',
                color: 'text.secondary',
                fontSize: 11,
              }}
            >
              {formatPrice(product.originalPrice)}
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mt: product.originalPrice ? 1.2 : 0,
            }}
          >
            {formatPrice(product.price)}
          </Typography>
        </Box>
        {/* 평점 */}
        <Box sx={{ mt: 0.5 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            sx={{
              '& .MuiRating-icon': { fontSize: 14 },
              fontSize: 14,
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            ml={0.2}
            sx={{ fontSize: 10, lineHeight: 0, display: 'block', mt: 0.25 }}
          >
            리뷰 {product.reviewCount}개
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
