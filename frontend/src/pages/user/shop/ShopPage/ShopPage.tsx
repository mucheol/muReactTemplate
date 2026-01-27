import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Stack,
  Typography,
  Alert,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { SHOP_CATEGORIES, SORT_OPTIONS } from '../data/shopData';
import type { SortOption } from '../data/shopData';
import { SearchBar } from '../../../../components/common/SearchBar';
import { SortSelect } from '../../../../components/common/SortSelect';
import { FilterSidebar } from './components/FilterSidebar';
import { CategoryTabs } from './components/CategoryTabs';
import { BestProductsCarousel } from './components/BestProductsCarousel';
import { ProductGrid } from './components/ProductGrid';
import { shopApi, type Product } from '../../../../modules/shop';

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

  // API 상태 관리
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 백엔드 API에서 상품 데이터 가져오기
   *
   * 첫 로드 시 한 번만 모든 상품을 가져옵니다.
   * 이후 카테고리 필터링, 검색, 정렬은 프론트엔드에서 처리하여 부드러운 UX를 제공합니다.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // 모든 상품 가져오기 (필터 없이)
        const response = await shopApi.getProducts();
        setAllProducts(response.data);
      } catch (err) {
        console.error('상품 목록 조회 실패:', err);
        setError('상품 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // 첫 로드 시 한 번만 실행

  /**
   * 프론트엔드에서 필터링, 검색, 정렬 처리
   *
   * 백엔드에서 한 번만 모든 상품을 가져온 후,
   * 카테고리, 검색어, 정렬, 가격 범위 필터를 프론트엔드에서 처리합니다.
   */
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. 카테고리 필터
    if (selectedCategory !== '전체') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // 3. 가격 범위 필터
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 4. 정렬
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        result.sort((a, b) => b.id - a.id); // ID가 높을수록 최신
        break;
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, priceRange, sortBy]);

  /**
   * 베스트 상품 목록
   *
   * 현재 필터링된 상품 중 isBest가 true인 상품만 추출 (최대 6개)
   */
  const bestProducts = useMemo(() => {
    return filteredProducts.filter((p) => p.isBest).slice(0, 6);
  }, [filteredProducts]);

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
    const params = new URLSearchParams(searchParams);
    if (category !== '전체') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.delete('page'); // 카테고리 변경 시 1페이지로
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
      const params = new URLSearchParams(searchParams);
      params.set('q', searchInput.trim());
      params.delete('page'); // 검색 시 1페이지로
      params.delete('category'); // 검색 시 카테고리 초기화
      setSearchParams(params);
    }
  };

  // 검색어 초기화
  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    setSearchParams(params);
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

  // 상품 클릭
  const handleProductClick = (productId: number) => {
    navigate(`/shop/${productId}`);
  };

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // 에러 발생 시 표시
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 3 }}>
      {/* 헤더 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          쇼핑몰
        </Typography>
        <Typography variant="body2" color="text.secondary">
          다양한 상품을 만나보세요
        </Typography>
      </Box>

      {/* 검색 바 */}
      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        placeholder="상품명, 카테고리로 검색하세요"
      />

      {/* 카테고리 탭 */}
      <CategoryTabs
        categories={SHOP_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        hasSearchQuery={!!searchQuery}
      />

      {/* 베스트 상품 캐러셀 */}
      <BestProductsCarousel products={bestProducts} onProductClick={handleProductClick} />

      {/* 필터 + 정렬 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setFilterOpen(true)}
          size="small"
        >
          필터
        </Button>
        <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={handleSortChange} />
      </Stack>

      {/* 검색 결과 표시 */}
      {searchQuery && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            "{searchQuery}" 검색 결과 ({filteredProducts.length}개)
          </Typography>
        </Box>
      )}

      {/* 상품 목록 */}
      {paginatedProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">상품이 없습니다.</Typography>
        </Box>
      ) : (
        <ProductGrid
          products={paginatedProducts}
          wishlist={wishlist}
          currentPage={validPage}
          totalPages={totalPages}
          onProductClick={handleProductClick}
          onWishlistToggle={toggleWishlist}
          onPageChange={handlePageChange}
        />
      )}

      {/* 필터 사이드바 (Drawer) */}
      <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          tempPriceRange={tempPriceRange}
          onPriceRangeChange={setTempPriceRange}
          onApplyPriceFilter={applyPriceFilter}
          onClearFilter={handleClearFilter}
          onClose={() => setFilterOpen(false)}
          isMobile={true}
        />
      </Drawer>
    </Container>
  );
};

export default ShopPage;
