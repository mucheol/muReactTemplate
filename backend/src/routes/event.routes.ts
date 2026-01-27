/**
 * 이벤트 관련 API 라우트
 *
 * 이 파일은 프론트엔드에서 요청하는 이벤트 관련 API를 처리합니다.
 */

import express = require('express');
const router = express.Router();

type EventCategory = 'discount' | 'coupon' | 'prize' | 'promotion';

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
    title: '럭키 박스 경품 추첨 이벤트',
    subtitle: '아이패드, 에어팟 등 푸짐한 선물을 받아가세요!',
    thumbnailUrl: '',
    category: 'prize',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    content: '구매 금액에 따라 추첨 기회가 늘어나는 럭키 박스 경품 이벤트입니다. 총 100명의 당첨자를 선정하여 아이패드, 에어팟, 스타벅스 쿠폰 등 다양한 선물을 드립니다.',
    howToParticipate: [
      '이벤트 기간 내 쇼핑몰에서 상품을 구매합니다.',
      '10,000원 구매 시 추첨 기회 1회, 50,000원 이상 구매 시 추첨 기회 5회가 자동으로 부여됩니다.',
      '당첨자는 이벤트 종료 후 7일 내 개별 연락을 통해 안내됩니다.',
    ],
    benefits: [
      '1등: 아이패드 Pro (2명)',
      '2등: 에어팟 Pro (10명)',
      '3등: 스타벅스 쿠폰 1만원권 (88명)',
    ],
    notes: [
      '당첨자는 이벤트 종료 후 7일 이내에 개별 연락 드립니다.',
      '경품 수령을 위해 배송 정보 확인이 필요할 수 있습니다.',
      '부정한 방법으로 참여 시 당첨이 취소될 수 있습니다.',
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
      '쇼핑몰 메인 페이지에서 "여름 시즌 MD 기획전" 배너를 클릭합니다.',
      '카테고리별 추천 상품을 둘러보고 장바구니에 담습니다.',
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
    title: '가을 패션 위크 특별전',
    subtitle: '가을 신상품 전 품목 20% 할인',
    thumbnailUrl: '',
    category: 'discount',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    content: '가을 시즌 신상품이 입고되었습니다. 트렌디한 가을 룩을 완성할 수 있는 다양한 패션 아이템을 특별 가격으로 만나보세요.',
    howToParticipate: [
      '쇼핑몰 패션 카테고리에 접속합니다.',
      '"가을 신상" 태그가 있는 상품을 확인합니다.',
      '장바구니에 담고 결제 시 자동 할인 적용됩니다.',
    ],
    benefits: [
      '가을 신상품 전 품목 20% 할인',
      '2벌 이상 구매 시 추가 5% 할인',
      '10만원 이상 구매 시 사은품 증정',
    ],
    notes: [
      '할인은 정상가 기준으로 적용됩니다.',
      '일부 한정 수량 상품은 조기 품절될 수 있습니다.',
      '교환/반품 시 사은품도 함께 반납해야 합니다.',
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
