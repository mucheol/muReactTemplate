import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  ALL_PRODUCTS,
  SHOP_CATEGORIES,
  SORT_OPTIONS,
  getProductsByCategory,
  sortProducts,
  formatPrice,
  getDiscountRate,
} from '../data/shopData';
import type { SortOption } from '../data/shopData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// @ts-ignore: CSS module has no type declarations
import 'swiper/css';

const PRODUCTS_PER_PAGE = 16;

const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 파라미터에서 상태 읽기
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedCategory = searchParams.get('category') || '전체';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = (searchParams.get('sort') || 'latest') as SortOption;

  // 검색 입력 상태
  const [searchInput, setSearchInput] = useState(searchQuery);

  // 필터 드로어 상태 (모바일)
  const [filterOpen, setFilterOpen] = useState(false);

  // 가격 범위 필터
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);
  const [tempPriceRange, setTempPriceRange] = useState<number[]>([0, 300000]);

  // 위시리스트 상태
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // 필터링 및 정렬된 상품 목록
  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS;

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      products = getProductsByCategory(selectedCategory);
    }

    // 검색어 필터 (카테고리 필터 결과에서 추가 필터링)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery),
      );
    }

    // 가격 범위 필터
    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 정렬
    return sortProducts(products, sortBy);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  // 선택된 카테고리의 베스트 상품 (최대 6개)
  const bestProducts = useMemo(() => {
    const products = selectedCategory === '전체' ? ALL_PRODUCTS : getProductsByCategory(selectedCategory);

    return products.filter((p) => p.isBest).slice(0, 6);
  }, [selectedCategory]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const validPage = Math.min(Math.max(1, currentPage), totalPages || 1);
  const paginatedProducts = filteredProducts.slice(
    (validPage - 1) * PRODUCTS_PER_PAGE,
    validPage * PRODUCTS_PER_PAGE,
  );

  // 페이지 변경
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 카테고리 선택
  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    if (category !== '전체') {
      params.set('category', category);
    }
    if (sortBy !== 'latest') {
      params.set('sort', sortBy);
    }
    setSearchParams(params);
    setSearchInput('');
  };

  // 정렬 변경
  const handleSortChange = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams);
    if (newSort === 'latest') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    params.delete('page');
    setSearchParams(params);
  };

  // 검색 실행
  const handleSearch = () => {
    if (searchInput.trim()) {
      const params = new URLSearchParams();
      params.set('q', searchInput.trim());
      if (sortBy !== 'latest') {
        params.set('sort', sortBy);
      }
      setSearchParams(params);
    }
  };

  // 검색어 입력 시 엔터키 처리
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 필터 초기화
  const handleClearFilter = () => {
    setSearchParams(new URLSearchParams());
    setSearchInput('');
    setPriceRange([0, 300000]);
    setTempPriceRange([0, 300000]);
  };

  // 가격 필터 적용
  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange);
    setFilterOpen(false);
  };

  // 위시리스트 토글
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // 필터 사이드바 JSX
  const filterSidebarContent = (
    <Box sx={{ width: { xs: 280, md: 240 }, p: 2 }}>
      {/* 모바일용 닫기 버튼 */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          필터
        </Typography>
        <IconButton onClick={() => setFilterOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

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
                onClick={() => handleCategoryClick(category)}
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
          onChange={(_, newValue) => setTempPriceRange(newValue as number[])}
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
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={applyPriceFilter}>
          적용
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 필터 초기화 */}
      <Button variant="outlined" fullWidth onClick={handleClearFilter}>
        필터 초기화
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 페이지 타이틀 */}
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        쇼핑몰
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* 좌측 필터 사이드바 (데스크톱) */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {filterSidebarContent}
          </Box>
        </Box>

        {/* 모바일 필터 드로어 */}
        <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
          {filterSidebarContent}
        </Drawer>

        {/* 메인 콘텐츠 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* 검색바 */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* 모바일 필터 버튼 */}
            <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>

            <TextField
              fullWidth
              size="small"
              placeholder="상품명을 검색하세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchInput && (
                        <IconButton size="small" onClick={() => setSearchInput('')} aria-label="검색어 지우기">
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton size="small" onClick={handleSearch} aria-label="검색">
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ maxWidth: 500 }}
            />
          </Box>

          {/* 카테고리 탭 */}
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
              {SHOP_CATEGORIES.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => {
                    handleCategoryClick(category);
                  }}
                  color={selectedCategory === category && !searchQuery ? 'primary' : 'default'}
                  variant={selectedCategory === category && !searchQuery ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </Box>

          {/* 카테고리 베스트 상품 자동 캐러셀 */}
          {bestProducts.length > 0 && (
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
                loop={bestProducts.length > 2}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                grabCursor
              >
                {bestProducts.map((product) => (
                  <SwiperSlide key={product.id}>
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}

          {/* 필터 상태 및 정렬 */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {searchQuery && (
                <Chip
                  label={`검색: "${searchQuery}"`}
                  onDelete={handleClearFilter}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              <Typography variant="body2" color="text.secondary">
                총 {filteredProducts.length}개 상품
              </Typography>
            </Box>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select value={sortBy} onChange={(e) => handleSortChange(e.target.value as SortOption)}>
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 상품 그리드 */}
          {paginatedProducts.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
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
                        toggleWishlist(product.id);
                      }}
                    >
                      {wishlist.has(product.id) ? (
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
              ))}
            </Box>
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                상품이 없습니다.
              </Typography>
              <Button variant="text" onClick={handleClearFilter} sx={{ mt: 2 }}>
                전체 보기
              </Button>
            </Box>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={totalPages} page={validPage} onChange={handlePageChange} color="primary" />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ShopPage;
