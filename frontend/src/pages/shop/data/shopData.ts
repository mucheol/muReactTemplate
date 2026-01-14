// 쇼핑몰 더미 데이터

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isBest: boolean;
}

export const SHOP_CATEGORIES = ['전체', '의류', '전자기기', '식품', '생활용품', '뷰티'];

export const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'price_low', label: '낮은 가격순' },
  { value: 'price_high', label: '높은 가격순' },
  { value: 'rating', label: '평점순' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

// 전체 더미 상품 (20개)
export const ALL_PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => {
  const categories = ['의류', '전자기기', '식품', '생활용품', '뷰티'];
  const category = categories[i % 5];
  const basePrice = [29900, 199000, 15000, 35000, 48000][i % 5];
  const hasDiscount = i % 3 === 0;

  return {
    id: i + 1,
    name: `상품명 ${i + 1}`,
    description: `이 상품은 ${category} 카테고리의 인기 상품입니다. 고품질 소재와 세련된 디자인으로 많은 사랑을 받고 있습니다.`,
    price: hasDiscount ? Math.floor(basePrice * 0.8) : basePrice,
    originalPrice: hasDiscount ? basePrice : undefined,
    category,
    tags: ['신상품', '인기', '추천', '한정'][i % 4] ? [['신상품', '인기', '추천', '한정'][i % 4]] : [],
    rating: 3.5 + (i % 3) * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 10,
    stock: Math.floor(Math.random() * 100) + 1,
    isNew: i < 5,
    isBest: i % 4 === 0,
  };
});

// 카테고리별 상품 필터
export const getProductsByCategory = (category: string) => {
  if (category === '전체') return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter((product) => product.category === category);
};

// 정렬
export const sortProducts = (products: Product[], sortBy: string) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'latest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'price_low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};

// ID로 상품 가져오기
export const getProductById = (id: number) => {
  return ALL_PRODUCTS.find((product) => product.id === id);
};

// 검색
export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

// 베스트 상품
export const getBestProducts = () => {
  return ALL_PRODUCTS.filter((product) => product.isBest).slice(0, 4);
};

// 신상품
export const getNewProducts = () => {
  return ALL_PRODUCTS.filter((product) => product.isNew).slice(0, 4);
};

// 가격 포맷팅
export const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR') + '원';
};

// 할인율 계산
export const getDiscountRate = (price: number, originalPrice?: number) => {
  if (!originalPrice) return 0;
  return Math.round((1 - price / originalPrice) * 100);
};
