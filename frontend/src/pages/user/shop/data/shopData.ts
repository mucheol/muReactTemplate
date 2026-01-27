// 쇼핑몰 상품 데이터

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
  brand?: string;
  thumbnail?: string;
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

// 전체 상품 데이터 (30개)
export const ALL_PRODUCTS: Product[] = [
  // 의류 (8개)
  {
    id: 1,
    name: '베이직 코튼 반팔 티셔츠',
    description: '부드러운 100% 면 소재로 제작된 베이직 라운드넥 티셔츠입니다. 데일리룩으로 활용하기 좋으며, 다양한 컬러로 구성되어 있습니다.',
    price: 19900,
    originalPrice: 29900,
    category: '의류',
    tags: ['베스트', '할인'],
    rating: 4.5,
    reviewCount: 1247,
    stock: 156,
    isNew: false,
    isBest: true,
    brand: 'Basic Lab',
  },
  {
    id: 2,
    name: '슬림핏 청바지',
    description: '트렌디한 슬림핏 디자인의 데님 팬츠입니다. 신축성이 좋아 활동하기 편하며, 세련된 워싱 처리로 고급스러운 느낌을 줍니다.',
    price: 49000,
    originalPrice: 69000,
    category: '의류',
    tags: ['신상', '인기'],
    rating: 4.7,
    reviewCount: 823,
    stock: 89,
    isNew: true,
    isBest: true,
    brand: 'Denim Co.',
  },
  {
    id: 3,
    name: '오버핏 후드 집업',
    description: '여유있는 오버핏 실루엣의 후드 집업입니다. 두툼한 기모 안감으로 따뜻하며, 캐주얼한 스타일링에 완벽합니다.',
    price: 39900,
    category: '의류',
    tags: ['신상'],
    rating: 4.3,
    reviewCount: 456,
    stock: 234,
    isNew: true,
    isBest: false,
    brand: 'Street Wear',
  },
  {
    id: 4,
    name: '캐시미어 블렌드 니트',
    description: '고급스러운 캐시미어 혼방 소재의 니트입니다. 부드러운 촉감과 우아한 실루엣으로 가을/겨울 필수 아이템입니다.',
    price: 89000,
    originalPrice: 129000,
    category: '의류',
    tags: ['할인', '프리미엄'],
    rating: 4.8,
    reviewCount: 312,
    stock: 67,
    isNew: false,
    isBest: false,
    brand: 'Cashmere House',
  },
  {
    id: 5,
    name: '와이드 슬랙스',
    description: '편안한 착용감의 와이드 핏 슬랙스입니다. 구김이 적은 원단으로 관리가 쉬우며, 오피스룩과 캐주얼룩 모두 소화 가능합니다.',
    price: 42000,
    category: '의류',
    tags: ['인기'],
    rating: 4.4,
    reviewCount: 589,
    stock: 145,
    isNew: false,
    isBest: false,
    brand: 'Office Style',
  },
  {
    id: 6,
    name: '패딩 점퍼',
    description: '경량 다운 충전재를 사용한 패딩 점퍼입니다. 가볍지만 보온성이 뛰어나며, 깔끔한 디자인으로 다양하게 활용 가능합니다.',
    price: 129000,
    originalPrice: 189000,
    category: '의류',
    tags: ['베스트', '할인'],
    rating: 4.6,
    reviewCount: 967,
    stock: 234,
    isNew: false,
    isBest: true,
    brand: 'Winter Warm',
  },
  {
    id: 7,
    name: '레깅스 팬츠',
    description: '4way 스판 소재의 요가/운동용 레깅스입니다. 신축성과 복원력이 뛰어나며, 땀 흡수 속건 기능으로 쾌적한 착용감을 제공합니다.',
    price: 29000,
    category: '의류',
    tags: ['스포츠'],
    rating: 4.5,
    reviewCount: 1134,
    stock: 456,
    isNew: false,
    isBest: false,
    brand: 'Active Wear',
  },
  {
    id: 8,
    name: '롱 코트',
    description: '클래식한 디자인의 울 블렌드 롱 코트입니다. 세련된 실루엣과 고급스러운 소재로 겨울 필수 아우터입니다.',
    price: 159000,
    originalPrice: 229000,
    category: '의류',
    tags: ['신상', '프리미엄'],
    rating: 4.9,
    reviewCount: 234,
    stock: 45,
    isNew: true,
    isBest: false,
    brand: 'Classic Coat',
  },

  // 전자기기 (8개)
  {
    id: 9,
    name: '블루투스 무선 이어폰',
    description: '고음질 AAC 코덱 지원 무선 이어폰입니다. ANC 노이즈 캔슬링 기능과 최대 24시간 재생이 가능하며, IPX4 생활방수를 지원합니다.',
    price: 89000,
    originalPrice: 129000,
    category: '전자기기',
    tags: ['베스트', '할인'],
    rating: 4.6,
    reviewCount: 2341,
    stock: 567,
    isNew: false,
    isBest: true,
    brand: 'AudioTech',
  },
  {
    id: 10,
    name: '스마트워치',
    description: '건강 관리 기능이 탑재된 스마트워치입니다. 심박수, 수면 분석, 운동 트래킹 기능을 제공하며, 7일 배터리 수명을 자랑합니다.',
    price: 159000,
    originalPrice: 199000,
    category: '전자기기',
    tags: ['신상', '인기'],
    rating: 4.5,
    reviewCount: 1567,
    stock: 234,
    isNew: true,
    isBest: true,
    brand: 'SmartFit',
  },
  {
    id: 11,
    name: '보조배터리 20000mAh',
    description: '대용량 20000mAh 급속충전 보조배터리입니다. PD 고속충전을 지원하며, 2개 포트로 동시 충전이 가능합니다.',
    price: 35000,
    category: '전자기기',
    tags: ['인기'],
    rating: 4.4,
    reviewCount: 892,
    stock: 345,
    isNew: false,
    isBest: false,
    brand: 'PowerBank',
  },
  {
    id: 12,
    name: '기계식 키보드',
    description: '청축 스위치를 사용한 RGB 백라이트 기계식 키보드입니다. 정확한 타건감과 내구성이 뛰어나며, 게이밍과 타이핑 모두 최적화되어 있습니다.',
    price: 89000,
    category: '전자기기',
    tags: ['게이밍'],
    rating: 4.7,
    reviewCount: 456,
    stock: 123,
    isNew: false,
    isBest: false,
    brand: 'MechaKey',
  },
  {
    id: 13,
    name: '무선 마우스',
    description: '인체공학적 디자인의 무선 마우스입니다. 최대 16000 DPI를 지원하며, 프로그래밍 가능한 6개 버튼이 있습니다.',
    price: 45000,
    originalPrice: 59000,
    category: '전자기기',
    tags: ['할인'],
    rating: 4.3,
    reviewCount: 678,
    stock: 234,
    isNew: false,
    isBest: false,
    brand: 'ErgoMouse',
  },
  {
    id: 14,
    name: '웹캠 Full HD',
    description: '1080p 풀HD 해상도의 웹캠입니다. 자동 초점 기능과 노이즈 캔슬링 마이크가 내장되어 화상회의와 스트리밍에 최적입니다.',
    price: 69000,
    category: '전자기기',
    tags: ['재택근무'],
    rating: 4.5,
    reviewCount: 543,
    stock: 189,
    isNew: false,
    isBest: false,
    brand: 'CamPro',
  },
  {
    id: 15,
    name: 'USB-C 허브',
    description: '7-in-1 멀티포트 USB-C 허브입니다. HDMI, USB 3.0, SD카드 리더, PD 충전을 지원하며, 알루미늄 바디로 내구성이 뛰어납니다.',
    price: 39000,
    category: '전자기기',
    tags: ['필수템'],
    rating: 4.6,
    reviewCount: 1234,
    stock: 456,
    isNew: false,
    isBest: false,
    brand: 'HubConnect',
  },
  {
    id: 16,
    name: '블루투스 스피커',
    description: '360도 사운드를 제공하는 포터블 블루투스 스피커입니다. IPX7 완전방수로 야외 활동에 적합하며, 12시간 연속 재생이 가능합니다.',
    price: 79000,
    originalPrice: 99000,
    category: '전자기기',
    tags: ['신상', '할인'],
    rating: 4.7,
    reviewCount: 789,
    stock: 267,
    isNew: true,
    isBest: true,
    brand: 'SoundWave',
  },

  // 식품 (5개)
  {
    id: 17,
    name: '프리미엄 원두커피 1kg',
    description: '에티오피아 예가체프 싱글 오리진 원두입니다. 플로럴한 향과 부드러운 산미가 특징이며, 중배전으로 로스팅했습니다.',
    price: 28000,
    category: '식품',
    tags: ['베스트'],
    rating: 4.8,
    reviewCount: 1567,
    stock: 234,
    isNew: false,
    isBest: true,
    brand: 'Coffee House',
  },
  {
    id: 18,
    name: '유기농 꿀 500g',
    description: '국내산 아카시아 유기농 꿀입니다. 무항생제 인증을 받았으며, 천연 그대로의 맛과 영양을 담았습니다.',
    price: 35000,
    category: '식품',
    tags: ['유기농', '건강'],
    rating: 4.9,
    reviewCount: 892,
    stock: 156,
    isNew: false,
    isBest: false,
    brand: 'Natural Honey',
  },
  {
    id: 19,
    name: '프로틴 파우더 2kg',
    description: 'WPI 단백질 함량 90% 이상의 프로틴 파우더입니다. 초코맛으로 맛있고, BCAA와 글루타민이 추가되어 운동 효과를 극대화합니다.',
    price: 59000,
    originalPrice: 79000,
    category: '식품',
    tags: ['운동', '할인'],
    rating: 4.5,
    reviewCount: 1234,
    stock: 345,
    isNew: false,
    isBest: false,
    brand: 'FitProtein',
  },
  {
    id: 20,
    name: '견과류 믹스 1kg',
    description: '아몬드, 호두, 캐슈너트, 피칸 혼합 견과류입니다. 무염 무첨가로 건강하며, 신선도 유지 지퍼백 포장입니다.',
    price: 22000,
    category: '식품',
    tags: ['건강', '인기'],
    rating: 4.7,
    reviewCount: 2345,
    stock: 567,
    isNew: false,
    isBest: true,
    brand: 'Nutty',
  },
  {
    id: 21,
    name: '올리브유 500ml',
    description: '스페인산 엑스트라 버진 올리브유입니다. 저온 압착 방식으로 추출하여 풍부한 향과 영양을 그대로 담았습니다.',
    price: 18000,
    category: '식품',
    tags: ['프리미엄'],
    rating: 4.6,
    reviewCount: 678,
    stock: 234,
    isNew: false,
    isBest: false,
    brand: 'Mediterranean Oil',
  },

  // 생활용품 (5개)
  {
    id: 22,
    name: '초음파 가습기',
    description: '6L 대용량 초음파 가습기입니다. 최대 24시간 연속 작동이 가능하며, 나노 미스트로 빠른 가습 효과를 제공합니다.',
    price: 45000,
    originalPrice: 69000,
    category: '생활용품',
    tags: ['베스트', '할인'],
    rating: 4.5,
    reviewCount: 1789,
    stock: 234,
    isNew: false,
    isBest: true,
    brand: 'AirFresh',
  },
  {
    id: 23,
    name: '진공 청소기',
    description: '무선 스틱형 진공청소기입니다. 120W 강력한 흡입력과 60분 사용 가능한 배터리, 다양한 전용 헤드가 포함되어 있습니다.',
    price: 189000,
    originalPrice: 259000,
    category: '생활용품',
    tags: ['신상', '할인'],
    rating: 4.7,
    reviewCount: 1234,
    stock: 89,
    isNew: true,
    isBest: true,
    brand: 'CleanPro',
  },
  {
    id: 24,
    name: '접이식 건조대',
    description: '3단 접이식 빨래 건조대입니다. SUS304 스테인리스 소재로 녹슬지 않으며, 공간 활용도가 뛰어납니다.',
    price: 29000,
    category: '생활용품',
    tags: ['인기'],
    rating: 4.4,
    reviewCount: 892,
    stock: 345,
    isNew: false,
    isBest: false,
    brand: 'HomeDry',
  },
  {
    id: 25,
    name: '스마트 LED 전구',
    description: 'WiFi 연결 스마트 LED 전구입니다. 앱으로 밝기와 색상을 조절할 수 있으며, 음성 제어를 지원합니다.',
    price: 15000,
    category: '생활용품',
    tags: ['스마트홈'],
    rating: 4.3,
    reviewCount: 567,
    stock: 678,
    isNew: false,
    isBest: false,
    brand: 'SmartLight',
  },
  {
    id: 26,
    name: '메모리폼 베개',
    description: '경추를 받쳐주는 인체공학적 메모리폼 베개입니다. 통풍이 잘 되는 겔 메모리폼으로 시원하고 편안한 수면을 도와줍니다.',
    price: 39000,
    originalPrice: 59000,
    category: '생활용품',
    tags: ['건강', '할인'],
    rating: 4.8,
    reviewCount: 1456,
    stock: 234,
    isNew: false,
    isBest: false,
    brand: 'SleepWell',
  },

  // 뷰티 (4개)
  {
    id: 27,
    name: '수분 크림 50ml',
    description: '히알루론산과 세라마이드가 함유된 고보습 크림입니다. 끈적임 없이 촉촉하게 피부를 가꿔주며, 민감성 피부도 사용 가능합니다.',
    price: 32000,
    category: '뷰티',
    tags: ['베스트'],
    rating: 4.7,
    reviewCount: 2134,
    stock: 456,
    isNew: false,
    isBest: true,
    brand: 'HydraBeauty',
  },
  {
    id: 28,
    name: '비타민C 세럼 30ml',
    description: '순수 비타민C 10% 함유 세럼입니다. 피부 톤을 밝게 개선하고 잡티를 완화시켜 주며, 항산화 효과로 피부 노화를 방지합니다.',
    price: 45000,
    originalPrice: 59000,
    category: '뷰티',
    tags: ['신상', '할인'],
    rating: 4.8,
    reviewCount: 1678,
    stock: 234,
    isNew: true,
    isBest: true,
    brand: 'VitaGlow',
  },
  {
    id: 29,
    name: '선크림 SPF50+ PA++++',
    description: '무기자차 선크림으로 백탁 현상이 없고 촉촉합니다. SPF50+ PA++++ 강력한 자외선 차단 효과를 제공합니다.',
    price: 18000,
    category: '뷰티',
    tags: ['필수템'],
    rating: 4.6,
    reviewCount: 3456,
    stock: 678,
    isNew: false,
    isBest: false,
    brand: 'SunProtect',
  },
  {
    id: 30,
    name: '클렌징 폼 150ml',
    description: '약산성 pH 밸런스 클렌징 폼입니다. 미세먼지와 노폐물을 깨끗하게 제거하며, 피부에 자극이 적고 촉촉함을 유지합니다.',
    price: 12000,
    category: '뷰티',
    tags: ['인기'],
    rating: 4.5,
    reviewCount: 2789,
    stock: 890,
    isNew: false,
    isBest: false,
    brand: 'CleanFace',
  },
];

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
      product.category.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery)
  );
};

// 베스트 상품
export const getBestProducts = () => {
  return ALL_PRODUCTS.filter((product) => product.isBest).slice(0, 8);
};

// 신상품
export const getNewProducts = () => {
  return ALL_PRODUCTS.filter((product) => product.isNew).slice(0, 8);
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
