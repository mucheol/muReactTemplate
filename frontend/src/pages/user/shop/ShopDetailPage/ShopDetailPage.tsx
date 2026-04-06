import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Skeleton,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { shopApi, type Product } from '../../../../modules/shop';
import { formatPrice, getDiscountRate } from '../data/shopData';

const ShopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // 상품 상세 정보 가져오기 - 메인 상품 먼저, 추천 상품은 백그라운드
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setRelatedLoading(true);

      // 1단계: 메인 상품 먼저 로드
      try {
        const response = await shopApi.getProduct(Number(id));
        setProduct(response.data);
      } catch (error) {
        console.error('상품 조회 실패:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }

      // 2단계: 추천 상품 백그라운드 로드
      try {
        const bestResponse = await shopApi.getProducts();
        const best = bestResponse.data
          .filter((p) => p.isBest && p.id !== Number(id))
          .slice(0, 4);
        setBestProducts(best);
      } catch {
        setBestProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton width={80} height={36} sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>
          <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 50%' } }}>
            <Skeleton variant="rectangular" sx={{ paddingTop: '100%', borderRadius: 2 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton width="60%" height={32} sx={{ mb: 1 }} />
            <Skeleton width="90%" height={44} sx={{ mb: 2 }} />
            <Skeleton width="40%" height={40} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={1} sx={{ mb: 3 }} />
            <Skeleton width="30%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={48} sx={{ mb: 2, borderRadius: 1 }} />
            <Grid container spacing={2}>
              <Grid size={6}><Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} /></Grid>
              <Grid size={6}><Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} /></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">상품을 찾을 수 없습니다.</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')} sx={{ mt: 2 }}>
          쇼핑몰로 돌아가기
        </Button>
      </Container>
    );
  }

  const discountRate = getDiscountRate(product.price, product.originalPrice);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 뒤로가기 */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')} sx={{ mb: 3 }}>
        목록으로
      </Button>

      {/* 상품 상세 */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>
        {/* 상품 이미지 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 50%' } }}>
          <Box
            sx={{
              position: 'relative',
              paddingTop: '100%',
              bgcolor: 'grey.200',
              borderRadius: 2,
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
              <Typography variant="h6" color="text.secondary">
                상품 이미지
              </Typography>
            </Box>
            {/* 뱃지 */}
            <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
              {product.isNew && <Chip label="NEW" color="error" />}
              {product.isBest && <Chip label="BEST" color="warning" />}
            </Box>
          </Box>
          {/* 썸네일 목록 */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {[1, 2, 3, 4].map((num) => (
              <Box
                key={num}
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: num === 1 ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {num}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* 상품 정보 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 50%' } }}>
          {/* 카테고리 */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.category}
          </Typography>

          {/* 상품명 */}
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            {product.name}
          </Typography>

          {/* 평점 */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              {product.rating}점 ({product.reviewCount}개 리뷰)
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* 가격 */}
          <Box sx={{ mb: 3 }}>
            {product.originalPrice && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Chip label={`${discountRate}% 할인`} color="error" size="small" />
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  {formatPrice(product.originalPrice)}
                </Typography>
              </Stack>
            )}
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {formatPrice(product.price)}
            </Typography>
          </Box>

          {/* 상품 설명 */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* 수량 선택 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              수량
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ minWidth: 40, textAlign: 'center' }}>{quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <AddIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                재고: {product.stock}개
              </Typography>
            </Stack>
          </Box>

          {/* 총 가격 */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">총 상품 금액</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {formatPrice(product.price * quantity)}
              </Typography>
            </Stack>
          </Box>

          {/* 버튼 */}
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" sx={{ flex: 1 }}>
              장바구니
            </Button>
            <Button variant="contained" sx={{ flex: 1 }}>
              바로 구매
            </Button>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 상품 상세 정보 탭 영역 */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          상품 상세 정보
        </Typography>

        {/* 브랜드 정보 */}
        {product.brand && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
              브랜드
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {product.brand}
            </Typography>
          </Box>
        )}

        {/* 상품 스펙 */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              제품 사양
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
              <Table>
                <TableBody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell
                        sx={{
                          width: '30%',
                          fontWeight: 'bold',
                          bgcolor: 'grey.50',
                        }}
                      >
                        {key}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* 주요 특징 */}
        {product.features && product.features.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              주요 특징
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                '& li': {
                  mb: 1.5,
                  color: 'text.secondary',
                  lineHeight: 1.7,
                },
              }}
            >
              {product.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body1">{feature}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        )}

        {/* 상세 설명 */}
        {product.detailDescription && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              상세 설명
            </Typography>
            <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Box
                sx={{
                  '& h3': {
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    mb: 2,
                    mt: 0,
                  },
                  '& h4': {
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    mb: 1.5,
                    mt: 3,
                  },
                  '& p': {
                    mb: 2,
                    lineHeight: 1.7,
                    color: 'text.secondary',
                  },
                  '& ul': {
                    pl: 3,
                    mb: 2,
                  },
                  '& li': {
                    mb: 1,
                    color: 'text.secondary',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: product.detailDescription }}
              />
            </Paper>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 추천 상품 */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          추천 상품
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          {relatedLoading
            ? [...Array(4)].map((_, i) => (
                <Box key={i}>
                  <Skeleton variant="rectangular" sx={{ paddingTop: '100%', borderRadius: 1, mb: 1 }} />
                  <Skeleton height={18} sx={{ mb: 0.5 }} />
                  <Skeleton width="60%" height={18} />
                </Box>
              ))
            : bestProducts.map((p) => (
            <Card
              key={p.id}
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 },
              }}
              onClick={() => navigate(`/shop/${p.id}`)}
            >
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
                  <Typography variant="caption" color="text.secondary">
                    이미지
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2" noWrap>
                  {p.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatPrice(p.price)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

    </Container>
  );
};

export default ShopDetailPage;
