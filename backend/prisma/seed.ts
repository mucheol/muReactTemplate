const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ==================== 블로그 포스트 ====================
  const blogPosts = [
    {
      title: 'React 19의 새로운 기능 살펴보기',
      excerpt: 'React 19에서 추가된 주요 기능들과 개선사항을 알아봅니다.',
      content: 'React 19에서 추가된 주요 기능들과 개선사항을 자세히 살펴보겠습니다...',
      category: '기술',
      tags: JSON.stringify(['React', 'JavaScript', '프론트엔드']),
      date: new Date('2024-01-15'),
      views: 1250,
      author: '김개발',
    },
    {
      title: 'TypeScript 5.0 마이그레이션 가이드',
      excerpt: 'TypeScript 5.0으로 업그레이드하는 방법을 단계별로 안내합니다.',
      content: 'TypeScript 5.0으로 업그레이드하는 방법을 자세히 안내합니다...',
      category: '기술',
      tags: JSON.stringify(['TypeScript', '마이그레이션']),
      date: new Date('2024-01-10'),
      views: 980,
      author: '이코딩',
    },
    {
      title: '효율적인 상태 관리 패턴',
      excerpt: 'React 애플리케이션에서 효율적으로 상태를 관리하는 방법을 알아봅니다.',
      content: 'React 애플리케이션에서 효율적으로 상태를 관리하는 다양한 패턴을 소개합니다...',
      category: '튜토리얼',
      tags: JSON.stringify(['React', '상태관리', 'Redux', 'Zustand']),
      date: new Date('2024-01-05'),
      views: 2100,
      author: '박프론트',
    },
    {
      title: 'Next.js 14 App Router 완벽 가이드',
      excerpt: 'Next.js 14의 App Router를 활용한 개발 방법을 소개합니다.',
      content: 'Next.js 14의 App Router를 활용한 개발 방법을 상세히 소개합니다...',
      category: '튜토리얼',
      tags: JSON.stringify(['Next.js', 'React', 'SSR']),
      date: new Date('2024-01-01'),
      views: 3200,
      author: '김개발',
    },
    {
      title: 'CSS-in-JS vs Tailwind CSS 비교',
      excerpt: '두 가지 스타일링 방식의 장단점을 비교 분석합니다.',
      content: 'CSS-in-JS와 Tailwind CSS의 장단점을 상세히 비교 분석합니다...',
      category: '비교분석',
      tags: JSON.stringify(['CSS', 'Tailwind', 'styled-components']),
      date: new Date('2023-12-28'),
      views: 1800,
      author: '이디자인',
    },
    {
      title: '웹 성능 최적화 체크리스트',
      excerpt: '웹 애플리케이션 성능을 향상시키기 위한 체크리스트입니다.',
      content: '웹 애플리케이션 성능을 향상시키기 위한 다양한 기법들을 소개합니다...',
      category: '가이드',
      tags: JSON.stringify(['성능최적화', '웹개발', 'Core Web Vitals']),
      date: new Date('2023-12-20'),
      views: 2500,
      author: '박프론트',
    },
    {
      title: '모던 JavaScript 필수 문법 정리',
      excerpt: 'ES6+ JavaScript의 필수 문법들을 정리합니다.',
      content: 'ES6 이후 JavaScript의 필수 문법들을 예제와 함께 정리합니다...',
      category: '기술',
      tags: JSON.stringify(['JavaScript', 'ES6', '문법']),
      date: new Date('2023-12-15'),
      views: 4100,
      author: '이코딩',
    },
    {
      title: 'Git 브랜치 전략 가이드',
      excerpt: '팀 협업을 위한 Git 브랜치 전략을 소개합니다.',
      content: '팀 협업을 위한 다양한 Git 브랜치 전략들을 소개합니다...',
      category: '가이드',
      tags: JSON.stringify(['Git', '협업', 'GitFlow']),
      date: new Date('2023-12-10'),
      views: 1500,
      author: '김개발',
    },
    {
      title: 'REST API 설계 베스트 프랙티스',
      excerpt: 'RESTful API를 설계할 때 고려해야 할 사항들을 정리합니다.',
      content: 'RESTful API를 설계할 때 고려해야 할 다양한 사항들을 정리합니다...',
      category: '가이드',
      tags: JSON.stringify(['API', 'REST', '백엔드']),
      date: new Date('2023-12-05'),
      views: 2800,
      author: '박백엔드',
    },
    {
      title: '프론트엔드 테스트 전략',
      excerpt: '프론트엔드 애플리케이션의 테스트 전략을 소개합니다.',
      content: '프론트엔드 애플리케이션을 위한 다양한 테스트 전략을 소개합니다...',
      category: '튜토리얼',
      tags: JSON.stringify(['테스트', 'Jest', 'Testing Library']),
      date: new Date('2023-12-01'),
      views: 1900,
      author: '이코딩',
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log(`Created ${blogPosts.length} blog posts`);

  // ==================== 상품 ====================
  const products = [
    { name: '프리미엄 캐시미어 코트', description: '최고급 캐시미어로 제작된 따뜻한 겨울 코트입니다.', price: 299000, originalPrice: 350000, category: '의류', tags: JSON.stringify(['겨울', '코트', '캐시미어']), rating: 4.8, reviewCount: 156, stock: 25, isNew: true, isBest: true, brand: '럭셔리웨어' },
    { name: '슬림핏 데님 팬츠', description: '편안한 착용감의 슬림핏 데님 팬츠입니다.', price: 79000, originalPrice: 89000, category: '의류', tags: JSON.stringify(['데님', '팬츠', '슬림핏']), rating: 4.5, reviewCount: 89, stock: 120, isNew: false, isBest: true, brand: '데님마스터' },
    { name: '오가닉 코튼 티셔츠', description: '친환경 오가닉 코튼으로 만든 기본 티셔츠입니다.', price: 35000, category: '의류', tags: JSON.stringify(['티셔츠', '오가닉', '기본']), rating: 4.3, reviewCount: 234, stock: 200, isNew: false, isBest: false, brand: '그린웨어' },
    { name: '울 블렌드 니트', description: '부드러운 울 블렌드 소재의 니트입니다.', price: 89000, originalPrice: 110000, category: '의류', tags: JSON.stringify(['니트', '울', '겨울']), rating: 4.6, reviewCount: 67, stock: 45, isNew: true, isBest: false, brand: '럭셔리웨어' },
    { name: '스포츠 레깅스', description: '운동시 편안한 스트레치 레깅스입니다.', price: 45000, category: '의류', tags: JSON.stringify(['레깅스', '스포츠', '운동']), rating: 4.4, reviewCount: 178, stock: 150, isNew: false, isBest: true, brand: '액티브웨어' },
    { name: '무선 블루투스 이어폰', description: '고음질 무선 블루투스 이어폰입니다.', price: 159000, originalPrice: 199000, category: '전자기기', tags: JSON.stringify(['이어폰', '블루투스', '무선']), rating: 4.7, reviewCount: 523, stock: 80, isNew: true, isBest: true, brand: '사운드테크' },
    { name: '스마트 워치 프로', description: '건강 관리와 알림 기능이 탑재된 스마트 워치입니다.', price: 299000, originalPrice: 350000, category: '전자기기', tags: JSON.stringify(['스마트워치', '웨어러블', '건강']), rating: 4.6, reviewCount: 312, stock: 35, isNew: true, isBest: true, brand: '테크기어' },
    { name: '휴대용 충전기 20000mAh', description: '대용량 휴대용 보조 배터리입니다.', price: 45000, category: '전자기기', tags: JSON.stringify(['충전기', '보조배터리', '휴대용']), rating: 4.4, reviewCount: 890, stock: 200, isNew: false, isBest: false, brand: '파워뱅크' },
    { name: '기계식 게이밍 키보드', description: 'RGB 백라이트가 있는 기계식 키보드입니다.', price: 129000, originalPrice: 150000, category: '전자기기', tags: JSON.stringify(['키보드', '게이밍', '기계식']), rating: 4.8, reviewCount: 445, stock: 60, isNew: false, isBest: true, brand: '게이밍기어' },
    { name: '노이즈캔슬링 헤드폰', description: '주변 소음을 차단하는 고급 헤드폰입니다.', price: 349000, originalPrice: 400000, category: '전자기기', tags: JSON.stringify(['헤드폰', '노이즈캔슬링', '고음질']), rating: 4.9, reviewCount: 267, stock: 25, isNew: true, isBest: true, brand: '사운드테크' },
    { name: '유기농 꿀 선물세트', description: '국내산 유기농 꿀 선물세트입니다.', price: 45000, category: '식품', tags: JSON.stringify(['꿀', '유기농', '선물']), rating: 4.7, reviewCount: 156, stock: 100, isNew: false, isBest: true, brand: '자연의맛' },
    { name: '프리미엄 견과류 믹스', description: '영양 가득한 프리미엄 견과류 믹스입니다.', price: 28000, originalPrice: 32000, category: '식품', tags: JSON.stringify(['견과류', '건강', '간식']), rating: 4.5, reviewCount: 234, stock: 180, isNew: true, isBest: false, brand: '헬시스낵' },
    { name: '수제 초콜릿 세트', description: '장인이 만든 수제 초콜릿 세트입니다.', price: 38000, category: '식품', tags: JSON.stringify(['초콜릿', '수제', '선물']), rating: 4.8, reviewCount: 89, stock: 50, isNew: true, isBest: true, brand: '쇼콜라티에' },
    { name: '프리미엄 향초 세트', description: '천연 원료로 만든 프리미엄 향초 세트입니다.', price: 55000, originalPrice: 65000, category: '생활용품', tags: JSON.stringify(['향초', '인테리어', '선물']), rating: 4.6, reviewCount: 178, stock: 90, isNew: false, isBest: true, brand: '센트하우스' },
    { name: '대나무 수건 세트', description: '부드러운 대나무 섬유로 만든 수건 세트입니다.', price: 35000, category: '생활용품', tags: JSON.stringify(['수건', '대나무', '친환경']), rating: 4.4, reviewCount: 312, stock: 150, isNew: false, isBest: false, brand: '에코리빙' },
    { name: '스테인리스 텀블러', description: '보온보냉 기능이 뛰어난 텀블러입니다.', price: 32000, originalPrice: 38000, category: '생활용품', tags: JSON.stringify(['텀블러', '보온', '친환경']), rating: 4.7, reviewCount: 456, stock: 200, isNew: true, isBest: true, brand: '에코리빙' },
    { name: '모이스처 에센스', description: '깊은 보습을 선사하는 에센스입니다.', price: 48000, originalPrice: 55000, category: '뷰티', tags: JSON.stringify(['에센스', '보습', '스킨케어']), rating: 4.6, reviewCount: 289, stock: 120, isNew: true, isBest: true, brand: '글로우스킨' },
    { name: '선크림 SPF50+', description: '강력한 자외선 차단 선크림입니다.', price: 28000, category: '뷰티', tags: JSON.stringify(['선크림', '자외선차단', '여름']), rating: 4.5, reviewCount: 567, stock: 250, isNew: false, isBest: true, brand: '선케어' },
    { name: '비타민C 세럼', description: '피부 톤을 밝게 해주는 비타민C 세럼입니다.', price: 52000, originalPrice: 60000, category: '뷰티', tags: JSON.stringify(['세럼', '비타민C', '브라이트닝']), rating: 4.7, reviewCount: 345, stock: 80, isNew: true, isBest: false, brand: '글로우스킨' },
    { name: '클렌징 오일', description: '메이크업을 깔끔하게 지워주는 클렌징 오일입니다.', price: 25000, category: '뷰티', tags: JSON.stringify(['클렌징', '오일', '메이크업리무버']), rating: 4.4, reviewCount: 423, stock: 180, isNew: false, isBest: false, brand: '클린뷰티' },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`Created ${products.length} products`);

  // ==================== 이벤트 ====================
  const now = new Date();
  const events = [
    {
      title: '신규 가입 20% 할인 이벤트',
      subtitle: '첫 구매 고객 대상 특별 혜택',
      category: 'discount',
      startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      content: '신규 가입 고객님께 첫 구매시 20% 할인 쿠폰을 드립니다.',
      howToParticipate: JSON.stringify(['회원가입', '첫 구매 시 쿠폰 자동 적용']),
      benefits: JSON.stringify(['20% 할인', '무료 배송']),
      notes: JSON.stringify(['1인 1회 한정', '일부 상품 제외']),
    },
    {
      title: '매일 출석체크 이벤트',
      subtitle: '매일 출석하고 포인트 받자!',
      category: 'attendance',
      startDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
      content: '매일 출석체크하고 포인트를 적립하세요.',
      howToParticipate: JSON.stringify(['로그인', '출석체크 버튼 클릭']),
      benefits: JSON.stringify(['1일: 100P', '7일 연속: 500P 보너스', '30일 연속: 2000P 보너스']),
    },
    {
      title: '럭키 룰렛 이벤트',
      subtitle: '돌려돌려 룰렛!',
      category: 'prize',
      startDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      prizeType: 'wheel',
      prizeItems: JSON.stringify([
        { id: 1, name: '10% 할인쿠폰', probability: 30, color: '#FF6B6B' },
        { id: 2, name: '500 포인트', probability: 25, color: '#4ECDC4' },
        { id: 3, name: '무료배송 쿠폰', probability: 20, color: '#45B7D1' },
        { id: 4, name: '1000 포인트', probability: 15, color: '#96CEB4' },
        { id: 5, name: '20% 할인쿠폰', probability: 8, color: '#FFEAA7' },
        { id: 6, name: '스타벅스 기프티콘', probability: 2, color: '#DDA0DD' },
      ]),
    },
    {
      title: '봄맞이 기획전',
      subtitle: '봄 시즌 특별 할인',
      category: 'promotion',
      startDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000),
      promotionSections: JSON.stringify([
        { id: 'spring-fashion', title: '봄 패션 아이템', products: [{ id: 1, name: '린넨 셔츠', brand: '베이직', price: 45000, originalPrice: 55000 }, { id: 2, name: '면 카디건', brand: '소프트웨어', price: 59000, originalPrice: 69000 }] },
      ]),
    },
    {
      title: '타임세일 특가',
      subtitle: '오늘만 이 가격!',
      category: 'timesale',
      startDate: new Date(now.getTime()),
      endDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      timeSaleEndTime: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      timeSaleProducts: JSON.stringify([
        { id: 1, name: '무선 이어폰', brand: '사운드테크', price: 99000, originalPrice: 159000, stock: 50, maxStock: 100 },
        { id: 2, name: '스마트 워치', brand: '테크기어', price: 199000, originalPrice: 299000, stock: 30, maxStock: 50 },
      ]),
    },
    {
      title: '퀴즈 이벤트',
      subtitle: '퀴즈 풀고 선물 받자!',
      category: 'quiz',
      startDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
      quizQuestions: JSON.stringify([
        { id: 1, question: '우리 쇼핑몰의 이름은?', options: ['마이쇼핑', '베스트쇼핑', '해피쇼핑', '스마트쇼핑'], correctAnswer: 0 },
        { id: 2, question: '현재 진행중인 할인 이벤트의 최대 할인율은?', options: ['10%', '20%', '30%', '50%'], correctAnswer: 1 },
      ]),
    },
    {
      title: '스탬프 투어',
      subtitle: '스탬프 모아 선물 받자!',
      category: 'stamp',
      startDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
      stampLocations: JSON.stringify([
        { id: 'home', title: '홈페이지 방문', description: '메인 페이지 방문하기', path: '/' },
        { id: 'shop', title: '쇼핑몰 구경', description: '쇼핑몰 페이지 방문하기', path: '/shop' },
        { id: 'blog', title: '블로그 읽기', description: '블로그 글 1개 읽기', path: '/blog' },
        { id: 'event', title: '이벤트 참여', description: '다른 이벤트 1개 참여', path: '/event' },
      ]),
    },
    {
      title: '친구 초대 쿠폰 이벤트',
      subtitle: '친구 초대하고 쿠폰 받자!',
      category: 'coupon',
      startDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 50 * 24 * 60 * 60 * 1000),
      content: '친구를 초대하면 나와 친구 모두 5000원 쿠폰을 드려요!',
      howToParticipate: JSON.stringify(['초대 링크 공유', '친구 회원가입 완료']),
      benefits: JSON.stringify(['나: 5000원 쿠폰', '친구: 5000원 쿠폰']),
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }
  console.log(`Created ${events.length} events`);

  // ==================== FAQ ====================
  const faqs = [
    { category: 'service', question: '서비스는 어떤 용도로 사용할 수 있나요?', answer: '본 서비스는 운영 현황 모니터링, 데이터 분석, 리포트 확인 등을 위해 사용할 수 있습니다.', tags: JSON.stringify(['서비스 소개', '기능']) },
    { category: 'service', question: '지원하는 브라우저/환경이 어떻게 되나요?', answer: '최신 버전의 Chrome, Edge, Safari, Firefox를 권장합니다.', tags: JSON.stringify(['환경', '브라우저']) },
    { category: 'account', question: '회원가입은 어떻게 하나요?', answer: '상단 우측의 회원가입 버튼을 클릭한 뒤, 이메일과 비밀번호를 입력해 계정을 생성할 수 있습니다.', tags: JSON.stringify(['계정', '가입']) },
    { category: 'account', question: '비밀번호를 잊어버렸습니다. 어떻게 해야 하나요?', answer: '로그인 화면에서 비밀번호 찾기를 클릭한 후, 가입하신 이메일 주소를 입력하면 비밀번호 재설정 메일이 발송됩니다.', tags: JSON.stringify(['비밀번호', '보안']) },
    { category: 'payment', question: '결제 수단은 어떤 것들을 지원하나요?', answer: '신용카드, 계좌이체, 가상계좌, 간편결제(카카오페이, 네이버페이 등)를 지원합니다.', tags: JSON.stringify(['결제', '요금']) },
    { category: 'payment', question: '청구서/영수증은 어디에서 확인할 수 있나요?', answer: '마이페이지의 결제 내역 메뉴에서 각 결제 건별 영수증과 세금계산서를 확인하고 다운로드할 수 있습니다.', tags: JSON.stringify(['영수증', '세금계산서']) },
    { category: 'etc', question: '고객센터 운영 시간은 어떻게 되나요?', answer: '고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다.', tags: JSON.stringify(['고객센터', '문의']) },
    { category: 'etc', question: '원하는 질문이 없을 때는 어떻게 문의하나요?', answer: 'FAQ에서 해결되지 않는 문의는 페이지 하단의 문의 채널을 통해 접수해 주세요.', tags: JSON.stringify(['문의 방법']) },
  ];

  for (const faq of faqs) {
    await prisma.faq.create({ data: faq });
  }
  console.log(`Created ${faqs.length} FAQs`);

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
