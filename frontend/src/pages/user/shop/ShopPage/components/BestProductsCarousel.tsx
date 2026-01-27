import { Box, Card, CardContent, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { formatPrice } from '../../data/shopData';
import type { Product } from '../../../../../modules/shop';
// @ts-ignore: CSS module has no type declarations
import 'swiper/css';

interface BestProductsCarouselProps {
  products: Product[];
  onProductClick: (productId: number) => void;
}

export const BestProductsCarousel = ({ products, onProductClick }: BestProductsCarouselProps) => {
  if (products.length === 0) return null;

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2,
        bgcolor: 'grey.50',
      }}
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
        loop={products.length > 2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        grabCursor
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
                transition: 'all 0.2s',
              }}
              onClick={() => onProductClick(product.id)}
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
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <LocalShippingOutlinedIcon sx={{ fontSize: 12, color: 'primary.main' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 9 }}>
                    무료배송
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ p: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    mb: 0.25,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                  }}
                >
                  {formatPrice(product.price)}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
