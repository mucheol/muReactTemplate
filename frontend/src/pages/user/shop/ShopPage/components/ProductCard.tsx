import { Box, Card, CardContent, Chip, Rating, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatPrice, getDiscountRate } from '../../data/shopData';
import type { Product } from '../../../../../modules/shop';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onCardClick: (productId: number) => void;
  onWishlistToggle: (productId: number) => void;
}

export const ProductCard = ({
  product,
  isWishlisted,
  onCardClick,
  onWishlistToggle,
}: ProductCardProps) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
        transition: 'all 0.2s',
      }}
      onClick={() => onCardClick(product.id)}
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

        {/* 무료배송 뱃지 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <LocalShippingOutlinedIcon sx={{ fontSize: 12, color: 'primary.main' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 9 }}>
            무료배송
          </Typography>
        </Box>

        {/* 위시리스트 버튼 */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'white',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 1,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'white',
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product.id);
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
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
