import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Chip,
  Stack,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {
  ALL_PRODUCTS,
  SHOP_CATEGORIES,
  SORT_OPTIONS,
  getProductsByCategory,
  sortProducts,
} from '../data/shopData';
import type { SortOption } from '../data/shopData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../components/ProductCard';

const PRODUCTS_PER_PAGE = 16;

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 파라미터에서 상태 읽기
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedCategory = searchParams.get('category') || '전체';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = (searchParams.get('sort') || 'latest') as SortOption;

  // 검색 입력 상태
  const [searchInput, setSearchInput] = useState(searchQuery);

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

    // 정렬
    return sortProducts(products, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

  // 선택된 카테고리의 베스트 상품 (최대 6개)
  const bestProducts = useMemo(() => {
    const products =
      selectedCategory === '전체'
        ? ALL_PRODUCTS
        : getProductsByCategory(selectedCategory);

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
    setSearchParams({});
    setSearchInput('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 페이지 타이틀 */}
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        쇼핑몰
      </Typography>

      {/* 검색바 */}
      <Box sx={{ mb: 3 }}>
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
                    <IconButton
                      size="small"
                      onClick={() => setSearchInput('')}
                      aria-label="검색어 지우기"
                    >
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
                <ProductCard product={product} variant="compact" />
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
              xs: 'repeat(3, 1fr)',
              sm: 'repeat(4, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 2,
          }}
        >
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
    </Container>
  );
};

export default ShopPage;
