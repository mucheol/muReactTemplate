/**
 * 쇼핑몰 상품 관련 API 라우트
 *
 * 이 파일은 상품 데이터를 처리하는 API 엔드포인트를 정의합니다.
 * Express의 Router를 사용하여 HTTP 요청(GET, POST 등)을 처리합니다.
 */

import express = require('express');
const router = express.Router();

/**
 * 상품 인터페이스 (TypeScript 타입 정의)
 *
 * 인터페이스란? 데이터의 구조(형태)를 미리 정의해두는 것입니다.
 * 예: "상품은 반드시 id, name, price 등의 정보를 가져야 한다"
 */
interface Product {
  id: number;           // 상품 고유 번호
  name: string;         // 상품명
  description: string;  // 상품 설명
  price: number;        // 판매가
  originalPrice?: number | undefined; // 원가 (? 표시는 선택사항, 없을 수도 있음. undefined를 명시적으로 허용)
  category: string;     // 카테고리 (예: 의류, 전자기기)
  tags: string[];       // 태그 배열 (예: ['신상품', '인기'])
  rating: number;       // 평점 (0~5)
  reviewCount: number;  // 리뷰 개수
  stock: number;        // 재고 수량
  isNew: boolean;       // 신상품 여부 (true/false)
  isBest: boolean;      // 베스트 상품 여부
}

/**
 * 더미 데이터 (임시 상품 데이터)
 *
 * 실제로는 데이터베이스에서 가져오지만, 학습을 위해
 * 일단 메모리에 저장된 배열로 만들어둡니다.
 *
 * Array.from()은 배열을 생성하는 함수입니다.
 * - { length: 20 } : 20개 만들기
 * - (_, i) => {...} : 각 항목을 어떻게 만들지 정의
 *   - _ : 사용하지 않는 값 (관례적으로 _로 표시)
 *   - i : 인덱스 (0, 1, 2, ... 19)
 */
const PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => {
  // 카테고리를 순환하면서 배정 (i를 5로 나눈 나머지로 선택)
  // 예: i=0 → 0%5=0 → '의류', i=5 → 5%5=0 → '의류', i=1 → 1%5=1 → '전자기기'
  const categories = ['의류', '전자기기', '식품', '생활용품', '뷰티'];
  const categoryIndex = i % 5;  // 0~4 사이의 숫자
  const category = categories[categoryIndex]!;  // ! 는 "이 값은 절대 undefined가 아니야"라고 TypeScript에게 알려주는 표시

  // 카테고리별 기본 가격 설정
  const basePrices = [29900, 199000, 15000, 35000, 48000];
  const basePrice = basePrices[categoryIndex]!;  // 위와 동일한 인덱스를 사용하므로 안전함

  // 3개 중 1개는 할인 상품으로 설정 (i가 3의 배수일 때)
  const hasDiscount = i % 3 === 0;

  // 태그 배열 미리 정의
  const allTags = ['신상품', '인기', '추천', '한정'];
  const tagIndex = i % 4;
  const tag = allTags[tagIndex]!;

  // 실제 상품 객체 생성 후 반환
  return {
    id: i + 1,                    // ID는 1부터 시작 (배열 인덱스는 0부터니까 +1)
    name: `상품명 ${i + 1}`,       // 예: "상품명 1", "상품명 2"
    description: `이 상품은 ${category} 카테고리의 인기 상품입니다. 고품질 소재와 세련된 디자인으로 많은 사랑을 받고 있습니다.`,
    price: hasDiscount ? Math.floor(basePrice * 0.8) : basePrice,  // 할인가는 20% off
    originalPrice: hasDiscount ? basePrice : undefined,            // 할인일 때만 원가 표시
    category,
    tags: [tag],  // 태그를 배열로 감싸기
    rating: 3.5 + (i % 3) * 0.5,  // 3.5, 4.0, 4.5 중 하나
    reviewCount: Math.floor(Math.random() * 200) + 10,  // 10~209 사이 랜덤 숫자
    stock: Math.floor(Math.random() * 100) + 1,         // 1~100 사이 랜덤 숫자
    isNew: i < 5,                 // 처음 5개만 신상품
    isBest: i % 4 === 0,          // 4개 중 1개는 베스트 상품
  };
});

/**
 * API 엔드포인트 1: 전체 상품 목록 조회
 *
 * GET /api/shop/products
 *
 * router.get() 설명:
 * - router.get(경로, 처리함수)
 * - 처리함수(req, res):
 *   - req (request): 클라이언트가 보낸 요청 정보
 *   - res (response): 서버가 보낼 응답
 */
router.get('/products', (req, res) => {
  /**
   * 쿼리 파라미터 받기
   *
   * 쿼리 파라미터란? URL 뒤에 붙는 값들
   * 예: /api/shop/products?category=의류&sort=price_low
   *
   * req.query.category는 '의류'를 가져옴
   * as string은 TypeScript 타입 지정 (이 값은 문자열이야)
   */
  const category = req.query.category as string;    // 카테고리 필터
  const sort = req.query.sort as string;            // 정렬 방식
  const search = req.query.search as string;        // 검색어

  // 필터링 시작 - products 변수에 PRODUCTS 배열을 복사
  let products = [...PRODUCTS];  // ...은 스프레드 연산자 (배열 복사)

  /**
   * 1. 카테고리 필터링
   *
   * filter()는 배열에서 조건에 맞는 것만 남기는 함수
   * 예: [1,2,3,4,5].filter(x => x > 3) → [4,5]
   */
  if (category) {
    products = products.filter((product) => product.category === category);
  }

  /**
   * 2. 검색어 필터링
   *
   * toLowerCase(): 소문자로 변환 (대소문자 구분 없이 검색하기 위해)
   * includes(): 문자열에 특정 단어가 포함되어 있는지 확인
   */
  if (search) {
    const lowerSearch = search.toLowerCase();
    products = products.filter((product) =>
      product.name.toLowerCase().includes(lowerSearch) ||
      product.description.toLowerCase().includes(lowerSearch)
    );
  }

  /**
   * 3. 정렬하기
   *
   * sort()는 배열을 정렬하는 함수
   * (a, b) => a - b 형태로 비교 함수를 제공
   * - 음수 반환: a가 앞
   * - 양수 반환: b가 앞
   */
  switch (sort) {
    case 'popular':  // 인기순 (리뷰 많은 순)
      products.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'price_low':  // 낮은 가격순
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':  // 높은 가격순
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':  // 평점순
      products.sort((a, b) => b.rating - a.rating);
      break;
    default:  // 기본: 최신순 (ID 높은 순)
      products.sort((a, b) => b.id - a.id);
  }

  /**
   * JSON 형태로 응답 보내기
   *
   * res.json()은 데이터를 JSON 형태로 클라이언트에게 전송
   *
   * 응답 형태:
   * {
   *   success: true,
   *   count: 20,
   *   data: [...상품배열]
   * }
   */
  res.json({
    success: true,
    count: products.length,  // 총 상품 개수
    data: products,          // 상품 배열
  });
});

/**
 * API 엔드포인트 2: 특정 상품 상세 조회
 *
 * GET /api/shop/products/:id
 *
 * :id는 URL 파라미터 (경로의 일부)
 * 예: /api/shop/products/5 → id=5
 *
 * req.params.id로 가져올 수 있음
 */
router.get('/products/:id', (req, res) => {
  /**
   * URL 파라미터에서 id 가져오기
   *
   * parseInt(): 문자열을 숫자로 변환
   * 예: "5" → 5
   */
  const productId = parseInt(req.params.id);

  /**
   * find(): 배열에서 조건에 맞는 첫 번째 요소 찾기
   *
   * 못 찾으면 undefined 반환
   */
  const product = PRODUCTS.find((p) => p.id === productId);

  /**
   * 상품을 못 찾은 경우 에러 응답
   *
   * res.status(404): HTTP 상태코드 404 (Not Found)
   * return으로 함수 종료 (아래 코드 실행 안 함)
   */
  if (!product) {
    return res.status(404).json({
      success: false,
      message: '상품을 찾을 수 없습니다.',
    });
  }

  /**
   * 상품을 찾은 경우 성공 응답
   */
  res.json({
    success: true,
    data: product,
  });
});

/**
 * 라우터를 외부에서 사용할 수 있도록 내보내기
 *
 * export =는 CommonJS 방식의 모듈 내보내기
 * (TypeScript에서 require()와 함께 사용)
 */
export = router;
