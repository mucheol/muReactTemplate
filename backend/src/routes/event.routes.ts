/**
 * 이벤트 관련 API 라우트
 *
 * 이 파일은 프론트엔드에서 요청하는 이벤트 관련 API를 처리합니다.
 */

import express = require('express');
const router = express.Router();

type EventCategory = 'discount' | 'coupon' | 'prize' | 'promotion' | 'attendance' | 'timesale' | 'quiz' | 'stamp';

interface PrizeItem {
  id: number;
  name: string;
  probability: number; // 확률 (%)
  color: string;
}

interface PromotionProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  category: string;
}

interface PromotionSection {
  id: string;
  title: string;
  products: PromotionProduct[];
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface StampLocation {
  id: string;
  title: string;
  description: string;
  path: string;
}

interface TimeSaleProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  maxStock: number;
  imageUrl?: string;
}

interface EventItem {
  id: number;
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  category: EventCategory;
  startDate: string;
  endDate: string;
  content?: string;
  howToParticipate?: string[];
  benefits?: string[];
  notes?: string[];
  prizeItems?: PrizeItem[]; // 경품 이벤트용
  prizeType?: 'wheel' | 'ladder'; // 경품 추첨 방식
  promotionSections?: PromotionSection[]; // 기획전용 상품 목록
  quizQuestions?: QuizQuestion[]; // 퀴즈 이벤트용
  stampLocations?: StampLocation[]; // 스탬프 투어용
  timeSaleProducts?: TimeSaleProduct[]; // 타임세일용
  timeSaleEndTime?: string; // 타임세일 종료 시간
}

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: '봄맞이 대규모 할인 기획전',
    subtitle: '전 카테고리 최대 50% 할인, 지금이 가장 저렴한 시기!',
    thumbnailUrl: '',
    category: 'discount',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    content: '봄 시즌을 맞아 인기 카테고리 상품을 최대 50%까지 할인하는 대규모 기획전입니다. 시즌 베스트 상품과 재구매율이 높은 스테디셀러를 합리적인 가격으로 만나보세요. 일부 한정 수량 상품의 경우 조기 품절될 수 있으며, 이벤트 기간 중에도 재고 상황에 따라 혜택이 변경될 수 있습니다.',
    howToParticipate: [
      '로그인 후 쇼핑몰에 접속합니다.',
      '할인 기획전 영역에서 관심 있는 카테고리를 선택합니다.',
      '할인 배지가 표시된 상품을 장바구니에 담고 결제하면 자동으로 할인 혜택이 적용됩니다.',
    ],
    benefits: [
      '최대 50% 할인 (카테고리별 상이)',
      '일부 상품 추가 적립금 지급',
      '특정 금액 이상 구매 시 무료배송 혜택',
    ],
    notes: [
      '이벤트 기간, 혜택 내용은 당사 사정에 따라 예고 없이 변경 또는 조기 종료될 수 있습니다.',
      '일부 브랜드/상품은 할인 대상에서 제외될 수 있습니다.',
      '다른 쿠폰 및 프로모션과 중복 적용이 불가할 수 있습니다.',
    ],
  },
  {
    id: 2,
    title: '신규 가입 감사 쿠폰 이벤트',
    subtitle: '첫 구매 시 사용 가능한 10,000원 할인 쿠폰을 드립니다.',
    thumbnailUrl: '',
    category: 'coupon',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    content: '회원가입 후 첫 구매를 하시는 모든 고객님께 10,000원 할인 쿠폰을 드립니다. 발급된 쿠폰은 마이페이지 > 쿠폰함에서 확인하실 수 있습니다.',
    howToParticipate: [
      '회원가입 또는 로그인합니다.',
      '아래 버튼을 눌러 쿠폰을 발급받습니다.',
      '상품 결제 시 쿠폰을 선택하여 할인 혜택을 적용합니다.',
    ],
    benefits: [
      '신규 회원 10,000원 할인 쿠폰',
      '발급일로부터 30일간 사용 가능',
      '최소 주문 금액 제한 없음',
    ],
    notes: [
      '쿠폰은 발급일로부터 7일 이내에만 사용 가능합니다.',
      '일부 카테고리/브랜드는 쿠폰 적용 대상에서 제외될 수 있습니다.',
      '다른 쿠폰 및 프로모션과 중복 사용이 제한될 수 있습니다.',
    ],
  },
  {
    id: 3,
    title: '럭키 룰렛 경품 추첨 이벤트',
    subtitle: '아이패드, 에어팟 등 푸짐한 선물을 받아가세요!',
    thumbnailUrl: '',
    category: 'prize',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    content: '룰렛을 돌려 행운의 경품을 받아가세요! 매일 1회 무료 참여 기회가 주어지며, 구매 금액에 따라 추가 기회를 얻을 수 있습니다.',
    howToParticipate: [
      '로그인 후 이벤트 페이지에 접속합니다.',
      '룰렛 돌리기 버튼을 클릭하여 경품 추첨에 참여합니다.',
      '당첨된 경품은 마이페이지 > 쿠폰함에서 확인할 수 있습니다.',
    ],
    benefits: [
      '매일 1회 무료 참여 기회',
      '10,000원 이상 구매 시 추가 1회 기회',
      '당첨 즉시 쿠폰/포인트 지급',
    ],
    notes: [
      '1일 최대 3회까지 참여 가능합니다.',
      '당첨된 쿠폰은 발급일로부터 30일간 유효합니다.',
      '부정한 방법으로 참여 시 당첨이 취소될 수 있습니다.',
    ],
    prizeType: 'wheel',
    prizeItems: [
      { id: 1, name: '꽝', probability: 40, color: '#f5f5f5' },
      { id: 2, name: '500 포인트', probability: 25, color: '#e3f2fd' },
      { id: 3, name: '1,000 포인트', probability: 15, color: '#bbdefb' },
      { id: 4, name: '3,000원 쿠폰', probability: 10, color: '#90caf9' },
      { id: 5, name: '5,000원 쿠폰', probability: 7, color: '#64b5f6' },
      { id: 6, name: '10,000원 쿠폰', probability: 2, color: '#42a5f5' },
      { id: 7, name: '에어팟 Pro', probability: 0.8, color: '#2196f3' },
      { id: 8, name: '아이패드 Pro', probability: 0.2, color: '#1976d2' },
    ],
  },
  {
    id: 4,
    title: '여름 시즌 MD 추천 기획전',
    subtitle: 'MD가 추천하는 여름 필수템 모음',
    thumbnailUrl: '',
    category: 'promotion',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    content: '여름 시즌을 맞아 MD가 엄선한 트렌디한 상품들을 한자리에서 만나보세요. 패션, 뷰티, 리빙 카테고리의 베스트 아이템을 특별한 가격으로 제공합니다.',
    howToParticipate: [
      '아래 카테고리 탭을 선택하여 상품을 둘러봅니다.',
      '마음에 드는 상품을 장바구니에 담습니다.',
      '결제 시 자동으로 기획전 혜택이 적용됩니다.',
    ],
    benefits: [
      'MD 추천 상품 최대 30% 할인',
      '5만원 이상 구매 시 무료배송',
      '리뷰 작성 시 추가 적립금 2,000원',
    ],
    notes: [
      '기획전 상품은 재고 소진 시 조기 종료될 수 있습니다.',
      '일부 브랜드는 추가 할인이 제한될 수 있습니다.',
      '배송은 영업일 기준 2-3일 소요됩니다.',
    ],
    promotionSections: [
      {
        id: 'fashion',
        title: '패션',
        products: [
          {
            id: 101,
            name: '린넨 와이드 팬츠',
            brand: 'Summer Style',
            price: 35000,
            originalPrice: 50000,
            category: 'fashion',
            imageUrl: '',
          },
          {
            id: 102,
            name: '시어서커 반팔 셔츠',
            brand: 'Cool Breeze',
            price: 29000,
            originalPrice: 45000,
            category: 'fashion',
            imageUrl: '',
          },
          {
            id: 103,
            name: '크롭 니트 가디건',
            brand: 'Knit House',
            price: 32000,
            originalPrice: 48000,
            category: 'fashion',
            imageUrl: '',
          },
          {
            id: 104,
            name: '스트라이프 맥시 원피스',
            brand: 'Dress Code',
            price: 42000,
            originalPrice: 65000,
            category: 'fashion',
            imageUrl: '',
          },
        ],
      },
      {
        id: 'beauty',
        title: '뷰티',
        products: [
          {
            id: 201,
            name: '워터프루프 선크림 SPF50+',
            brand: 'Sun Guard',
            price: 18000,
            originalPrice: 25000,
            category: 'beauty',
            imageUrl: '',
          },
          {
            id: 202,
            name: '쿨링 진정 수분 크림',
            brand: 'Fresh Skin',
            price: 28000,
            originalPrice: 40000,
            category: 'beauty',
            imageUrl: '',
          },
          {
            id: 203,
            name: '워터 틴트 립스틱 세트',
            brand: 'Color Pop',
            price: 24000,
            originalPrice: 35000,
            category: 'beauty',
            imageUrl: '',
          },
          {
            id: 204,
            name: '프레시 미스트 토너',
            brand: 'Hydra Plus',
            price: 22000,
            originalPrice: 32000,
            category: 'beauty',
            imageUrl: '',
          },
        ],
      },
      {
        id: 'living',
        title: '리빙',
        products: [
          {
            id: 301,
            name: '쿨링 이불 세트 (Q)',
            brand: 'Sleep Well',
            price: 58000,
            originalPrice: 89000,
            category: 'living',
            imageUrl: '',
          },
          {
            id: 302,
            name: '대나무 차렵이불',
            brand: 'Natural Home',
            price: 35000,
            originalPrice: 55000,
            category: 'living',
            imageUrl: '',
          },
          {
            id: 303,
            name: 'UV 차단 암막 커튼',
            brand: 'Window Deco',
            price: 45000,
            originalPrice: 70000,
            category: 'living',
            imageUrl: '',
          },
          {
            id: 304,
            name: '냉감 방석 4P 세트',
            brand: 'Cool Life',
            price: 28000,
            originalPrice: 42000,
            category: 'living',
            imageUrl: '',
          },
        ],
      },
      {
        id: 'electronics',
        title: '가전',
        products: [
          {
            id: 401,
            name: '미니 서큘레이터',
            brand: 'Air Flow',
            price: 32000,
            originalPrice: 48000,
            category: 'electronics',
            imageUrl: '',
          },
          {
            id: 402,
            name: '휴대용 선풍기',
            brand: 'Cool Breeze',
            price: 18000,
            originalPrice: 28000,
            category: 'electronics',
            imageUrl: '',
          },
          {
            id: 403,
            name: 'USB 미니 냉풍기',
            brand: 'Desk Cooler',
            price: 25000,
            originalPrice: 38000,
            category: 'electronics',
            imageUrl: '',
          },
          {
            id: 404,
            name: '차량용 냉장고',
            brand: 'Car Cool',
            price: 89000,
            originalPrice: 129000,
            category: 'electronics',
            imageUrl: '',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: '친구 추천 이벤트',
    subtitle: '친구를 초대하고 함께 혜택을 받아가세요',
    thumbnailUrl: '',
    category: 'coupon',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    content: '친구에게 쇼핑몰을 추천하고 친구가 회원가입 후 첫 구매를 완료하면, 추천인과 친구 모두 5,000원 할인 쿠폰을 드립니다.',
    howToParticipate: [
      '마이페이지에서 친구 초대 링크를 복사합니다.',
      '친구에게 링크를 공유하고 회원가입을 유도합니다.',
      '친구가 첫 구매를 완료하면 쿠폰이 자동 지급됩니다.',
    ],
    benefits: [
      '추천인: 친구 1명당 5,000원 쿠폰',
      '피추천인: 첫 구매 시 5,000원 쿠폰',
      '추천 횟수 제한 없음',
    ],
    notes: [
      '피추천인이 첫 구매를 완료해야 쿠폰이 지급됩니다.',
      '쿠폰 유효기간은 발급일로부터 30일입니다.',
      '부정한 방법으로 참여 시 혜택이 취소될 수 있습니다.',
    ],
  },
  {
    id: 6,
    title: '사다리타기 행운 뽑기',
    subtitle: '사다리를 타고 내려가 행운의 경품을 받아가세요!',
    thumbnailUrl: '',
    category: 'prize',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    content: '사다리타기로 재미있게 경품을 받아보세요! 출발점을 선택하고 사다리를 따라가면 도착지에 있는 경품이 여러분의 것!',
    howToParticipate: [
      '로그인 후 이벤트 페이지에 접속합니다.',
      '원하는 출발점을 선택합니다.',
      '사다리 시작 버튼을 눌러 결과를 확인합니다.',
    ],
    benefits: [
      '매일 1회 무료 참여',
      '구매 금액별 추가 기회 제공',
      '즉시 당첨 확인 가능',
    ],
    notes: [
      '1일 최대 5회까지 참여 가능합니다.',
      '당첨 쿠폰은 즉시 지급되며 30일간 유효합니다.',
      '부정 참여 적발 시 혜택이 취소됩니다.',
    ],
    prizeType: 'ladder',
    prizeItems: [
      { id: 1, name: '꽝', probability: 30, color: '#f5f5f5' },
      { id: 2, name: '500 포인트', probability: 30, color: '#e8f5e9' },
      { id: 3, name: '1,000 포인트', probability: 20, color: '#c8e6c9' },
      { id: 4, name: '2,000원 쿠폰', probability: 10, color: '#a5d6a7' },
      { id: 5, name: '5,000원 쿠폰', probability: 8, color: '#81c784' },
      { id: 6, name: '10,000원 쿠폰', probability: 2, color: '#66bb6a' },
    ],
  },
  {
    id: 7,
    title: '매일매일 출석체크',
    subtitle: '매일 방문하고 포인트 받아가세요!',
    thumbnailUrl: '',
    category: 'attendance',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    content: '매일 출석체크하고 포인트를 쌓아보세요! 연속 출석 시 추가 보너스 포인트를 드립니다.',
    howToParticipate: [
      '로그인 후 이벤트 페이지에 접속합니다.',
      '출석 체크 버튼을 클릭합니다.',
      '포인트가 자동으로 적립됩니다.',
    ],
    benefits: [
      '매일 출석: 100 포인트',
      '7일 연속: 1,000 포인트 보너스',
      '30일 완주: 10,000 포인트 보너스',
    ],
    notes: [
      '하루 1회만 출석 체크 가능합니다.',
      '출석이 끊기면 처음부터 다시 시작됩니다.',
      '포인트는 즉시 지급됩니다.',
    ],
  },
  {
    id: 8,
    title: '오늘만 특가! 타임세일',
    subtitle: '시간 한정 특가 상품을 놓치지 마세요!',
    thumbnailUrl: '',
    category: 'timesale',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    content: '6시간 한정! 인기 상품을 최대 70% 할인된 가격에 만나보세요. 한정 수량이니 서둘러주세요!',
    howToParticipate: [
      '타임세일 상품을 확인합니다.',
      '원하는 상품을 장바구니에 담습니다.',
      '재고 소진 전에 구매를 완료합니다.',
    ],
    benefits: [
      '최대 70% 할인',
      '무료배송',
      '선착순 구매 시 추가 적립금',
    ],
    notes: [
      '재고 소진 시 조기 종료됩니다.',
      '타임세일 상품은 쿠폰 중복 사용 불가합니다.',
      '환불/교환 시 일반 정책이 적용됩니다.',
    ],
    timeSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    timeSaleProducts: [
      {
        id: 501,
        name: '무선 블루투스 이어폰',
        brand: 'Sound Pro',
        price: 29000,
        originalPrice: 99000,
        stock: 15,
        maxStock: 50,
        imageUrl: '',
      },
      {
        id: 502,
        name: '스마트워치',
        brand: 'Tech Gear',
        price: 89000,
        originalPrice: 299000,
        stock: 3,
        maxStock: 20,
        imageUrl: '',
      },
      {
        id: 503,
        name: '노트북 거치대',
        brand: 'Desk Mate',
        price: 15000,
        originalPrice: 45000,
        stock: 0,
        maxStock: 30,
        imageUrl: '',
      },
      {
        id: 504,
        name: 'USB 충전 케이블 5종 세트',
        brand: 'Cable Master',
        price: 12000,
        originalPrice: 35000,
        stock: 28,
        maxStock: 40,
        imageUrl: '',
      },
      {
        id: 505,
        name: '무선 마우스',
        brand: 'Click Pro',
        price: 18000,
        originalPrice: 59000,
        stock: 8,
        maxStock: 25,
        imageUrl: '',
      },
      {
        id: 506,
        name: '키보드 손목 받침대',
        brand: 'Comfort Zone',
        price: 9000,
        originalPrice: 29000,
        stock: 22,
        maxStock: 35,
        imageUrl: '',
      },
    ],
  },
  {
    id: 9,
    title: '상식 퀴즈 이벤트',
    subtitle: '퀴즈를 풀고 쿠폰을 받아가세요!',
    thumbnailUrl: '',
    category: 'quiz',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    content: '간단한 상식 퀴즈를 풀고 정답률에 따라 다양한 보상을 받아가세요!',
    howToParticipate: [
      '퀴즈 문제를 읽고 정답을 선택합니다.',
      '모든 문제를 풀고 결과를 확인합니다.',
      '정답률에 따라 보상이 지급됩니다.',
    ],
    benefits: [
      '100% 정답: 5,000원 쿠폰',
      '80% 이상: 3,000원 쿠폰',
      '60% 이상: 1,000 포인트',
    ],
    notes: [
      '1일 1회만 참여 가능합니다.',
      '보상은 즉시 지급됩니다.',
      '부정 행위 적발 시 참여가 제한될 수 있습니다.',
    ],
    quizQuestions: [
      {
        id: 1,
        question: '대한민국의 수도는 어디인가요?',
        options: ['부산', '서울', '대구', '인천'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: '1년은 몇 개월인가요?',
        options: ['10개월', '11개월', '12개월', '13개월'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: '지구에서 가장 큰 대륙은?',
        options: ['아프리카', '유럽', '아시아', '북아메리카'],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: '물의 화학식은?',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: '태양계에서 가장 큰 행성은?',
        options: ['지구', '화성', '목성', '토성'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 10,
    title: '스탬프 투어 이벤트',
    subtitle: '사이트를 탐험하고 스탬프를 모아보세요!',
    thumbnailUrl: '',
    category: 'stamp',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    content: '사이트의 다양한 페이지를 방문하고 스탬프를 모아보세요! 모든 스탬프를 모으면 특별한 보상을 드립니다.',
    howToParticipate: [
      '각 위치의 "방문하기" 버튼을 클릭합니다.',
      '해당 페이지로 이동하면 자동으로 스탬프가 찍힙니다.',
      '모든 스탬프를 모으고 보상을 받습니다.',
    ],
    benefits: [
      '전체 완료 시: 5,000원 쿠폰',
      '스탬프 획득 시마다 추가 포인트',
      '완료 후 추첨을 통한 추가 경품',
    ],
    notes: [
      '각 위치는 한 번만 방문 인정됩니다.',
      '이벤트 기간 내에 완료해야 합니다.',
      '모든 스탬프를 모은 후 보상 받기 버튼을 클릭하세요.',
    ],
    stampLocations: [
      {
        id: 'shop',
        title: '쇼핑몰',
        description: '다양한 상품을 둘러보세요',
        path: '/shop',
      },
      {
        id: 'blog',
        title: '블로그',
        description: '유용한 정보를 확인하세요',
        path: '/blog',
      },
      {
        id: 'event',
        title: '이벤트',
        description: '진행 중인 이벤트를 확인하세요',
        path: '/event',
      },
      {
        id: 'faq',
        title: 'FAQ',
        description: '자주 묻는 질문을 확인하세요',
        path: '/faq',
      },
      {
        id: 'mypage',
        title: '마이페이지',
        description: '내 정보를 관리하세요',
        path: '/mypage',
      },
    ],
  },
];

/**
 * GET /api/event/events
 * 이벤트 목록 조회
 *
 * Query Parameters:
 * - status: 'all' | 'ongoing' | 'ended'
 * - category: 'all' | 'discount' | 'coupon' | 'prize' | 'promotion'
 */
router.get('/events', (req, res) => {
  const { status, category } = req.query;

  let filteredEvents = [...EVENTS];

  // 상태 필터링 (진행중/종료)
  if (status === 'ongoing') {
    filteredEvents = filteredEvents.filter((event) => {
      const now = new Date();
      const endDate = new Date(event.endDate);
      return now <= endDate;
    });
  } else if (status === 'ended') {
    filteredEvents = filteredEvents.filter((event) => {
      const now = new Date();
      const endDate = new Date(event.endDate);
      return now > endDate;
    });
  }

  // 카테고리 필터링
  if (category && category !== 'all') {
    filteredEvents = filteredEvents.filter((event) => event.category === category);
  }

  res.json({
    success: true,
    count: filteredEvents.length,
    data: filteredEvents,
  });
});

/**
 * GET /api/event/events/:id
 * 특정 이벤트 상세 조회
 */
router.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    res.status(404).json({
      success: false,
      message: '이벤트를 찾을 수 없습니다.',
    });
    return;
  }

  res.json({
    success: true,
    data: event,
  });
});

/**
 * GET /api/event/categories
 * 이벤트 카테고리 목록 조회
 */
router.get('/categories', (req, res) => {
  const categories = ['all', 'discount', 'coupon', 'prize', 'promotion'];

  res.json({
    success: true,
    data: categories,
  });
});

export = router;
