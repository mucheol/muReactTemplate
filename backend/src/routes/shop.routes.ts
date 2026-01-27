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
  brand?: string;       // 브랜드명 (선택사항)
  specifications?: Record<string, string>; // 상세 스펙 (예: { '소재': '면 100%', '원산지': '한국' })
  features?: string[];  // 주요 특징 배열
  detailDescription?: string; // 상세 설명 (HTML 가능)
}

/**
 * 실제 상품 데이터 (30개)
 *
 * 실제로는 데이터베이스에서 가져오지만, 학습을 위해
 * 일단 메모리에 저장된 배열로 만들어둡니다.
 */
const PRODUCTS: Product[] = [
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
    specifications: {
      '소재': '면 100%',
      '제조국': '한국',
      '사이즈': 'S, M, L, XL',
      '색상': '화이트, 블랙, 네이비, 그레이',
      '세탁방법': '미지근한 물에 손세탁 권장',
      '두께감': '적당함'
    },
    features: [
      '부드러운 면 100% 소재로 피부에 자극이 없습니다',
      '깔끔한 라운드넥 디자인으로 어떤 스타일에도 매치하기 좋습니다',
      '넉넉한 기장감으로 활동하기 편안합니다',
      '다양한 컬러와 사이즈 선택 가능',
      '변형 없는 고품질 봉제로 오래 입을 수 있습니다'
    ],
    detailDescription: `
      <h3>상품 상세 설명</h3>
      <p>Basic Lab의 베이직 코튼 티셔츠는 매일 입어도 질리지 않는 기본 아이템입니다.</p>
      <p>100% 순면 소재로 제작되어 피부에 닿는 느낌이 부드럽고 통기성이 뛰어납니다.</p>

      <h4>추천 스타일링</h4>
      <ul>
        <li>청바지와 함께 캐주얼한 데일리룩</li>
        <li>슬랙스와 매치하여 세미 캐주얼 룩</li>
        <li>가디건이나 셔츠 안에 이너로 활용</li>
      </ul>

      <h4>관리 방법</h4>
      <p>미지근한 물에 손세탁하시거나 세탁망에 넣어 약하게 세탁해주세요. 직사광선을 피해 그늘에 건조하시면 오래도록 새것처럼 입으실 수 있습니다.</p>
    `
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
    brand: 'Urban Fit',
    specifications: {
      '소재': '면 72%, 폴리에스터 26%, 스판덱스 2%',
      '제조국': '방글라데시',
      '사이즈': '28, 29, 30, 31, 32, 33, 34',
      '색상': '다크블루, 라이트블루, 블랙',
      '핏': '슬림핏',
      '신축성': '우수'
    },
    features: [
      '2% 스판덱스 함유로 뛰어난 신축성과 복원력',
      '세련된 워싱 처리로 빈티지한 느낌',
      '슬림한 핏으로 다리 라인을 깔끔하게 연출',
      '5포켓 디자인으로 실용성 확보',
      '내구성 좋은 YKK 지퍼 사용'
    ],
    detailDescription: `
      <h3>Urban Fit 슬림핏 청바지</h3>
      <p>트렌디한 슬림핏 실루엣으로 세련된 스타일을 완성하세요.</p>
      <p>스판덱스가 함유되어 있어 활동성이 뛰어나며, 하루 종일 입어도 편안합니다.</p>

      <h4>디자인 특징</h4>
      <ul>
        <li>고급스러운 워싱 처리로 자연스러운 빈티지 룩</li>
        <li>슬림한 핏이지만 답답하지 않은 적당한 여유</li>
        <li>모던한 스티치 디테일</li>
      </ul>

      <h4>착용감</h4>
      <p>허리와 허벅지는 슬림하게, 종아리 부분은 적당히 테이퍼드되어 있어 다리 라인이 깔끔하게 보입니다. 신축성이 좋아 장시간 착용해도 불편함이 없습니다.</p>
    `
  },
  { id: 3, name: '오버핏 후드 집업', description: '여유있는 오버핏 실루엣의 후드 집업입니다. 두툼한 기모 안감으로 따뜻하며, 캐주얼한 스타일링에 완벽합니다.', price: 39900, category: '의류', tags: ['신상'], rating: 4.3, reviewCount: 456, stock: 234, isNew: true, isBest: false, brand: 'Comfort Zone', specifications: { '소재': '면 80%, 폴리에스터 20%', '안감': '기모', '제조국': '한국', '사이즈': 'M, L, XL, 2XL', '색상': '블랙, 그레이, 네이비' }, features: ['두툼한 기모 안감으로 뛰어난 보온성', '여유있는 오버핏으로 편안한 착용감', 'YKK 지퍼 사용으로 내구성 우수', '넉넉한 캥거루 포켓', '후드 끈 조절 가능'], detailDescription: '<h3>Comfort Zone 오버핏 후드 집업</h3><p>추운 날씨에 딱 맞는 따뜻하고 편안한 후드입니다. 두툼한 기모 안감이 체온을 보호해주며, 오버핏 실루엣으로 레이어드하기 좋습니다.</p>' },
  { id: 4, name: '캐시미어 블렌드 니트', description: '고급스러운 캐시미어 혼방 소재의 니트입니다. 부드러운 촉감과 우아한 실루엣으로 가을/겨울 필수 아이템입니다.', price: 89000, originalPrice: 129000, category: '의류', tags: ['할인', '프리미엄'], rating: 4.8, reviewCount: 312, stock: 67, isNew: false, isBest: false, brand: 'Luxury Knit', specifications: { '소재': '캐시미어 30%, 울 50%, 나일론 20%', '제조국': '이탈리아', '사이즈': 'S, M, L', '색상': '베이지, 차콜, 와인', '넥라인': '라운드넥' }, features: ['프리미엄 캐시미어 30% 혼방', '이탈리아 원단 사용', '부드럽고 따뜻한 착용감', '고급스러운 광택', '필링이 적고 내구성 좋음'], detailDescription: '<h3>Luxury Knit 캐시미어 블렌드 니트</h3><p>캐시미어 30%가 함유된 프리미엄 니트입니다. 이탈리아산 원단을 사용하여 부드러운 촉감과 우아한 실루엣을 자랑합니다.</p>' },
  { id: 5, name: '와이드 슬랙스', description: '편안한 착용감의 와이드 핏 슬랙스입니다. 구김이 적은 원단으로 관리가 쉬우며, 오피스룩과 캐주얼룩 모두 소화 가능합니다.', price: 42000, category: '의류', tags: ['인기'], rating: 4.4, reviewCount: 589, stock: 145, isNew: false, isBest: false, brand: 'Modern Pants', specifications: { '소재': '폴리에스터 60%, 레이온 35%, 스판덱스 5%', '제조국': '한국', '사이즈': 'S, M, L', '색상': '블랙, 네이비, 베이지', '핏': '와이드핏' }, features: ['구김이 적은 고기능성 원단', '편안한 와이드 핏', '허리 밴딩 처리로 편안함', '오피스와 캐주얼 모두 가능', '관리가 쉬운 소재'], detailDescription: '<h3>Modern Pants 와이드 슬랙스</h3><p>편안함과 세련됨을 동시에 갖춘 와이드 슬랙스입니다. 구김이 적은 원단으로 출장이나 여행 시에도 간편하게 관리할 수 있습니다.</p>' },
  { id: 6, name: '패딩 점퍼', description: '경량 다운 충전재를 사용한 패딩 점퍼입니다. 가볍지만 보온성이 뛰어나며, 깔끔한 디자인으로 다양하게 활용 가능합니다.', price: 129000, originalPrice: 189000, category: '의류', tags: ['베스트', '할인'], rating: 4.6, reviewCount: 967, stock: 234, isNew: false, isBest: true, brand: 'Winter Gear', specifications: { '충전재': '덕다운 90%', '겉감': '나일론 100%', '필파워': '700FP', '제조국': '한국', '사이즈': 'S, M, L, XL', '색상': '블랙, 네이비, 카키' }, features: ['700FP 고품질 덕다운 사용', '경량이면서도 뛰어난 보온성', '방풍 및 발수 가공', '슬림한 디자인으로 활동성 좋음', '탈부착 가능한 후드'], detailDescription: '<h3>Winter Gear 패딩 점퍼</h3><p>700FP 고품질 덕다운을 90% 사용한 프리미엄 패딩입니다. 가벼우면서도 따뜻하며, 슬림한 디자인으로 도시적인 스타일을 연출합니다.</p>' },
  { id: 7, name: '레깅스 팬츠', description: '4way 스판 소재의 요가/운동용 레깅스입니다. 신축성과 복원력이 뛰어나며, 땀 흡수 속건 기능으로 쾌적한 착용감을 제공합니다.', price: 29000, category: '의류', tags: ['스포츠'], rating: 4.5, reviewCount: 1134, stock: 456, isNew: false, isBest: false, brand: 'Active Wear', specifications: { '소재': '나일론 75%, 스판덱스 25%', '제조국': '한국', '사이즈': 'XS, S, M, L', '색상': '블랙, 네이비, 와인, 올리브', '기능': '속건, 흡한속건' }, features: ['4way 신축성으로 자유로운 움직임', '땀 흡수 및 속건 기능', '복원력 우수하여 변형 없음', '허리 밴딩으로 편안한 착용감', '요가, 필라테스, 러닝 등 다목적 활용'], detailDescription: '<h3>Active Wear 레깅스 팬츠</h3><p>요가와 운동을 위한 고기능성 레깅스입니다. 4way 신축성으로 어떤 동작에도 자유롭고, 속건 기능으로 항상 쾌적하게 운동할 수 있습니다.</p>' },
  { id: 8, name: '롱 코트', description: '클래식한 디자인의 울 블렌드 롱 코트입니다. 세련된 실루엣과 고급스러운 소재로 겨울 필수 아우터입니다.', price: 159000, originalPrice: 229000, category: '의류', tags: ['신상', '프리미엄'], rating: 4.9, reviewCount: 234, stock: 45, isNew: true, isBest: false, brand: 'Classic Line', specifications: { '소재': '울 70%, 폴리에스터 30%', '제조국': '한국', '사이즈': 'S, M, L', '색상': '카멜, 그레이, 블랙', '기장': '롱', '안감': '폴리에스터 안감 포함' }, features: ['울 70% 혼방으로 따뜻하고 고급스러움', '클래식한 디자인으로 오래 입기 좋음', '롱 기장으로 우아한 실루엣', '넉넉한 포켓', '더블 버튼 디자인'], detailDescription: '<h3>Classic Line 롱 코트</h3><p>클래식한 디자인의 울 블렌드 롱 코트로, 시간이 지나도 유행을 타지 않습니다. 울 70% 함유로 보온성이 뛰어나며, 세련된 실루엣이 돋보입니다.</p>' },

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
    brand: 'SoundPro',
    specifications: {
      '블루투스': '5.3',
      '코덱': 'AAC, SBC',
      '재생시간': '이어폰 6시간 + 케이스 18시간',
      '충전시간': '약 1.5시간',
      '방수등급': 'IPX4',
      '드라이버': '10mm 다이나믹 드라이버',
      '무게': '이어폰 5g, 케이스 45g',
      '색상': '블랙, 화이트'
    },
    features: [
      'ANC 액티브 노이즈 캔슬링으로 주변 소음 차단',
      '투명 모드로 주변 소리 듣기 가능',
      'AAC 고음질 코덱 지원으로 깨끗한 사운드',
      '인체공학적 설계로 장시간 착용해도 편안함',
      'IPX4 생활방수로 운동 시에도 안심',
      '터치 센서로 간편한 조작',
      '저지연 게이밍 모드 지원'
    ],
    detailDescription: `
      <h3>SoundPro 블루투스 무선 이어폰</h3>
      <p>프리미엄 사운드와 편안한 착용감을 동시에 누리세요.</p>

      <h4>음질</h4>
      <p>10mm 대구경 다이나믹 드라이버가 탑재되어 풍부한 저음과 선명한 고음을 재현합니다. AAC 코덱 지원으로 무선 연결에서도 고음질을 유지합니다.</p>

      <h4>노이즈 캔슬링</h4>
      <p>ANC 기술로 주변 소음을 최대 30dB까지 차단합니다. 지하철이나 카페에서도 음악에 온전히 집중할 수 있습니다. 투명 모드를 켜면 이어폰을 빼지 않고도 대화가 가능합니다.</p>

      <h4>배터리</h4>
      <p>이어폰 단독으로 6시간, 충전 케이스 포함 시 총 24시간 사용이 가능합니다. 급속 충전 기능으로 10분 충전에 2시간 사용할 수 있습니다.</p>

      <h4>패키지 구성</h4>
      <ul>
        <li>이어폰 본체</li>
        <li>충전 케이스</li>
        <li>이어팁 (S, M, L)</li>
        <li>USB-C 충전 케이블</li>
        <li>사용 설명서</li>
      </ul>
    `
  },
  { id: 10, name: '스마트워치', description: '건강 관리 기능이 탑재된 스마트워치입니다. 심박수, 수면 분석, 운동 트래킹 기능을 제공하며, 7일 배터리 수명을 자랑합니다.', price: 159000, originalPrice: 199000, category: '전자기기', tags: ['신상', '인기'], rating: 4.5, reviewCount: 1567, stock: 234, isNew: true, isBest: true, brand: 'FitTech', specifications: { '디스플레이': '1.4인치 AMOLED', '배터리': '7일', '방수': '5ATM', '센서': '심박수, 혈중산소, 가속도계', '연결': '블루투스 5.0', '무게': '42g' }, features: ['24시간 심박수 모니터링', '100가지 운동 모드', '수면 패턴 분석', 'GPS 내장', '스마트폰 알림'], detailDescription: '<h3>FitTech 스마트워치</h3><p>건강 관리와 운동 트래킹을 위한 스마트워치입니다. 24시간 심박수 모니터링과 수면 분석으로 건강을 체계적으로 관리할 수 있습니다.</p>' },
  { id: 11, name: '보조배터리 20000mAh', description: '대용량 20000mAh 급속충전 보조배터리입니다. PD 고속충전을 지원하며, 2개 포트로 동시 충전이 가능합니다.', price: 35000, category: '전자기기', tags: ['인기'], rating: 4.4, reviewCount: 892, stock: 345, isNew: false, isBest: false, brand: 'PowerBank Pro', specifications: { '용량': '20000mAh', '입력': 'USB-C PD 18W', '출력': 'USB-C PD 20W, USB-A QC3.0', '무게': '380g', '색상': '블랙, 화이트' }, features: ['대용량 20000mAh', 'PD 고속충전 지원', '2개 포트 동시 충전', 'LED 잔량 표시', '다중 안전 보호 기능'], detailDescription: '<h3>PowerBank Pro 보조배터리</h3><p>대용량 20000mAh로 스마트폰 약 4~5회 충전 가능합니다. PD 고속충전으로 빠르게 충전할 수 있습니다.</p>' },
  { id: 12, name: '기계식 키보드', description: '청축 스위치를 사용한 RGB 백라이트 기계식 키보드입니다. 정확한 타건감과 내구성이 뛰어나며, 게이밍과 타이핑 모두 최적화되어 있습니다.', price: 89000, category: '전자기기', tags: ['게이밍'], rating: 4.7, reviewCount: 456, stock: 123, isNew: false, isBest: false, brand: 'KeyMaster', specifications: { '스위치': '청축 (Cherry MX Blue)', '배열': '104키 풀배열', '백라이트': 'RGB (1680만 컬러)', '연결': 'USB-C 유선', '키캡': 'PBT 더블샷' }, features: ['Cherry MX 청축 스위치', 'RGB 백라이트 커스터마이징', '5000만회 내구성', 'N-Key 롤오버', '알루미늄 상판'], detailDescription: '<h3>KeyMaster 기계식 키보드</h3><p>Cherry MX 청축 스위치를 사용한 프리미엄 기계식 키보드입니다. 정확한 타건감과 청량한 클릭음으로 타이핑의 즐거움을 제공합니다.</p>' },
  { id: 13, name: '무선 마우스', description: '인체공학적 디자인의 무선 마우스입니다. 최대 16000 DPI를 지원하며, 프로그래밍 가능한 6개 버튼이 있습니다.', price: 45000, originalPrice: 59000, category: '전자기기', tags: ['할인'], rating: 4.3, reviewCount: 678, stock: 234, isNew: false, isBest: false, brand: 'ErgoMouse', specifications: { 'DPI': '100-16000', '버튼': '6개 (프로그래밍 가능)', '센서': '광학 센서', '배터리': '충전식 (70시간)', '연결': '2.4GHz 무선 + 블루투스' }, features: ['인체공학적 디자인', '16000 DPI 조절 가능', '6개 프로그래밍 버튼', '70시간 배터리', '2가지 연결 방식'], detailDescription: '<h3>ErgoMouse 무선 마우스</h3><p>인체공학적 디자인으로 손목 피로를 줄여주는 무선 마우스입니다. 정밀한 센서와 커스터마이징 가능한 버튼으로 게이밍과 작업 모두 최적화되어 있습니다.</p>' },
  { id: 14, name: '웹캠 Full HD', description: '1080p 풀HD 해상도의 웹캠입니다. 자동 초점 기능과 노이즈 캔슬링 마이크가 내장되어 화상회의와 스트리밍에 최적입니다.', price: 69000, category: '전자기기', tags: ['재택근무'], rating: 4.5, reviewCount: 543, stock: 189, isNew: false, isBest: false, brand: 'CamPro', specifications: { '해상도': '1080p 30fps', '렌즈': '자동 초점', '시야각': '90도', '마이크': '노이즈 캔슬링 듀얼 마이크', '연결': 'USB-A' }, features: ['풀HD 1080p 화질', '자동 초점 및 밝기 조절', '90도 광각 렌즈', '노이즈 캔슬링 마이크', '삼각대 마운트 지원'], detailDescription: '<h3>CamPro 웹캠 Full HD</h3><p>화상회의와 스트리밍을 위한 풀HD 웹캠입니다. 자동 초점과 밝기 조절 기능으로 언제나 선명한 화질을 제공합니다.</p>' },
  { id: 15, name: 'USB-C 허브', description: '7-in-1 멀티포트 USB-C 허브입니다. HDMI, USB 3.0, SD카드 리더, PD 충전을 지원하며, 알루미늄 바디로 내구성이 뛰어납니다.', price: 39000, category: '전자기기', tags: ['필수템'], rating: 4.6, reviewCount: 1234, stock: 456, isNew: false, isBest: false, brand: 'HubMax', specifications: { '포트': 'HDMI 4K, USB 3.0 x3, SD/TF 카드 리더, PD 충전', '재질': '알루미늄 합금', '데이터 전송': 'USB 3.0 5Gbps', '호환': 'MacBook, iPad Pro, Windows' }, features: ['7-in-1 멀티포트', '4K HDMI 출력', 'USB 3.0 고속 전송', '100W PD 충전 지원', '알루미늄 바디'], detailDescription: '<h3>HubMax USB-C 허브</h3><p>노트북의 확장성을 높여주는 7-in-1 USB-C 허브입니다. 4K HDMI 출력, 고속 데이터 전송, PD 충전을 모두 지원합니다.</p>' },
  { id: 16, name: '블루투스 스피커', description: '360도 사운드를 제공하는 포터블 블루투스 스피커입니다. IPX7 완전방수로 야외 활동에 적합하며, 12시간 연속 재생이 가능합니다.', price: 79000, originalPrice: 99000, category: '전자기기', tags: ['신상', '할인'], rating: 4.7, reviewCount: 789, stock: 267, isNew: true, isBest: true, brand: 'SoundWave', specifications: { '출력': '20W 스테레오', '블루투스': '5.0', '방수': 'IPX7', '배터리': '12시간', '무게': '650g' }, features: ['360도 사운드', 'IPX7 완전방수', '12시간 재생', '핸즈프리 통화', 'TWS 페어링'], detailDescription: '<h3>SoundWave 블루투스 스피커</h3><p>360도 사운드로 어디서나 풍부한 음질을 즐길 수 있습니다. IPX7 완전방수로 야외 활동에도 안심하고 사용할 수 있습니다.</p>' },

  // 식품 (5개)
  { id: 17, name: '프리미엄 원두커피 1kg', description: '에티오피아 예가체프 싱글 오리진 원두입니다. 플로럴한 향과 부드러운 산미가 특징이며, 중배전으로 로스팅했습니다.', price: 28000, category: '식품', tags: ['베스트'], rating: 4.8, reviewCount: 1567, stock: 234, isNew: false, isBest: true, brand: 'Coffee Masters', specifications: { '원산지': '에티오피아 예가체프', '로스팅': '중배전 (Medium)', '가공방식': '워시드', '용량': '1kg', '유통기한': '제조일로부터 6개월' }, features: ['싱글 오리진 스페셜티 원두', '플로럴한 향미', '부드러운 산미', '신선 로스팅', '밀봉 포장'], detailDescription: '<h3>Coffee Masters 프리미엄 원두</h3><p>에티오피아 예가체프 지역의 고품질 원두를 직접 수입하여 신선하게 로스팅했습니다. 플로럴한 향과 깔끔한 산미가 특징입니다.</p>' },
  { id: 18, name: '유기농 꿀 500g', description: '국내산 아카시아 유기농 꿀입니다. 무항생제 인증을 받았으며, 천연 그대로의 맛과 영양을 담았습니다.', price: 35000, category: '식품', tags: ['유기농', '건강'], rating: 4.9, reviewCount: 892, stock: 156, isNew: false, isBest: false, brand: 'Honey Farm', specifications: { '원산지': '국내산', '종류': '아카시아 꿀', '인증': '유기농, 무항생제', '용량': '500g', '채밀시기': '5월' }, features: ['국내산 유기농 인증', '무항생제 벌꿀', '100% 순수 천연 꿀', '비가열 처리', '항아리 포장'], detailDescription: '<h3>Honey Farm 유기농 꿀</h3><p>국내 양봉장에서 정성껏 채취한 유기농 아카시아 꿀입니다. 무항생제 인증으로 안심하고 드실 수 있습니다.</p>' },
  { id: 19, name: '프로틴 파우더 2kg', description: 'WPI 단백질 함량 90% 이상의 프로틴 파우더입니다. 초코맛으로 맛있고, BCAA와 글루타민이 추가되어 운동 효과를 극대화합니다.', price: 59000, originalPrice: 79000, category: '식품', tags: ['운동', '할인'], rating: 4.5, reviewCount: 1234, stock: 345, isNew: false, isBest: false, brand: 'Muscle Pro', specifications: { '단백질': 'WPI 90% 이상', '용량': '2kg (약 66회 분량)', '맛': '초코', '추가성분': 'BCAA, 글루타민', '제조국': '미국' }, features: ['WPI 고함량 단백질', '맛있는 초코 맛', 'BCAA와 글루타민 함유', '빠른 흡수', '무첨가 설탕'], detailDescription: '<h3>Muscle Pro 프로틴 파우더</h3><p>운동 후 빠른 근육 회복을 위한 고품질 WPI 프로틴입니다. 초코 맛으로 맛있게 드실 수 있습니다.</p>' },
  { id: 20, name: '견과류 믹스 1kg', description: '아몬드, 호두, 캐슈너트, 피칸 혼합 견과류입니다. 무염 무첨가로 건강하며, 신선도 유지 지퍼백 포장입니다.', price: 22000, category: '식품', tags: ['건강', '인기'], rating: 4.7, reviewCount: 2345, stock: 567, isNew: false, isBest: true, brand: 'Nutri Mix', specifications: { '구성': '아몬드, 호두, 캐슈너트, 피칸', '원산지': '미국, 호주', '가공': '무염, 무첨가', '용량': '1kg', '포장': '신선도 유지 지퍼백' }, features: ['4가지 프리미엄 견과류', '무염 무첨가', '신선한 견과류', '지퍼백 포장', '간식 및 요리용'], detailDescription: '<h3>Nutri Mix 견과류 믹스</h3><p>엄선된 4가지 견과류를 황금 비율로 믹스했습니다. 무염 무첨가로 건강하게 즐기세요.</p>' },
  { id: 21, name: '올리브유 500ml', description: '스페인산 엑스트라 버진 올리브유입니다. 저온 압착 방식으로 추출하여 풍부한 향과 영양을 그대로 담았습니다.', price: 18000, category: '식품', tags: ['프리미엄'], rating: 4.6, reviewCount: 678, stock: 234, isNew: false, isBest: false, brand: 'Olive Gold', specifications: { '원산지': '스페인', '등급': '엑스트라 버진', '추출방식': '저온 압착 (Cold Press)', '용량': '500ml', '산도': '0.3% 이하' }, features: ['스페인산 프리미엄 올리브', '엑스트라 버진 등급', '저온 압착 방식', '풍부한 향', '요리 및 드레싱용'], detailDescription: '<h3>Olive Gold 엑스트라 버진 올리브유</h3><p>스페인에서 재배한 올리브를 저온 압착하여 영양과 향을 그대로 담았습니다. 샐러드 드레싱과 요리에 활용하세요.</p>' },

  // 생활용품 (5개)
  { id: 22, name: '초음파 가습기', description: '6L 대용량 초음파 가습기입니다. 최대 24시간 연속 작동이 가능하며, 나노 미스트로 빠른 가습 효과를 제공합니다.', price: 45000, originalPrice: 69000, category: '생활용품', tags: ['베스트', '할인'], rating: 4.5, reviewCount: 1789, stock: 234, isNew: false, isBest: true, brand: 'AirFresh', specifications: { '용량': '6L', '가습량': '300ml/h', '작동시간': '최대 24시간', '적용면적': '20평', '소음': '35dB 이하' }, features: ['대용량 6L', '나노 미스트', '24시간 연속 작동', '저소음', '자동 전원 차단'], detailDescription: '<h3>AirFresh 초음파 가습기</h3><p>6L 대용량으로 하루 종일 가습이 가능합니다. 나노 미스트로 빠르고 효과적으로 실내 습도를 조절합니다.</p>' },
  { id: 23, name: '진공 청소기', description: '무선 스틱형 진공청소기입니다. 120W 강력한 흡입력과 60분 사용 가능한 배터리, 다양한 전용 헤드가 포함되어 있습니다.', price: 189000, originalPrice: 259000, category: '생활용품', tags: ['신상', '할인'], rating: 4.7, reviewCount: 1234, stock: 89, isNew: true, isBest: true, brand: 'CleanMax', specifications: { '흡입력': '120W', '배터리': '60분', '충전시간': '3.5시간', '무게': '2.4kg', '먼지통': '0.6L' }, features: ['강력한 120W 흡입력', '60분 사용 가능', '무선 스틱형', '다양한 헤드 포함', 'HEPA 필터'], detailDescription: '<h3>CleanMax 진공 청소기</h3><p>강력한 흡입력과 긴 배터리 수명으로 편리하게 청소할 수 있습니다. 다양한 전용 헤드로 침대, 소파, 틈새까지 깨끗하게 관리하세요.</p>' },
  { id: 24, name: '접이식 건조대', description: '3단 접이식 빨래 건조대입니다. SUS304 스테인리스 소재로 녹슬지 않으며, 공간 활용도가 뛰어납니다.', price: 29000, category: '생활용품', tags: ['인기'], rating: 4.4, reviewCount: 892, stock: 345, isNew: false, isBest: false, brand: 'Home Plus', specifications: { '소재': 'SUS304 스테인리스', '단수': '3단', '크기': '180x60x130cm', '내하중': '30kg', '접이식': '가능' }, features: ['녹슬지 않는 스테인리스', '3단 대용량', '접이식으로 공간 절약', '튼튼한 내구성', '이동식 바퀴'], detailDescription: '<h3>Home Plus 접이식 건조대</h3><p>SUS304 스테인리스 소재로 녹슬지 않고 오래 사용할 수 있습니다. 3단 구조로 빨래를 많이 널 수 있습니다.</p>' },
  { id: 25, name: '스마트 LED 전구', description: 'WiFi 연결 스마트 LED 전구입니다. 앱으로 밝기와 색상을 조절할 수 있으며, 음성 제어를 지원합니다.', price: 15000, category: '생활용품', tags: ['스마트홈'], rating: 4.3, reviewCount: 567, stock: 678, isNew: false, isBest: false, brand: 'SmartLight', specifications: { '밝기': '800루멘', '색온도': '2700K-6500K', '연결': 'WiFi 2.4GHz', '수명': '25000시간', '호환': 'Alexa, Google Home' }, features: ['앱으로 원격 제어', '밝기 및 색상 조절', '음성 제어 지원', '일정 설정 가능', '에너지 효율'], detailDescription: '<h3>SmartLight LED 전구</h3><p>스마트폰 앱으로 어디서나 조명을 제어할 수 있습니다. 음성 명령으로도 간편하게 켜고 끌 수 있습니다.</p>' },
  { id: 26, name: '메모리폼 베개', description: '경추를 받쳐주는 인체공학적 메모리폼 베개입니다. 통풍이 잘 되는 겔 메모리폼으로 시원하고 편안한 수면을 도와줍니다.', price: 39000, originalPrice: 59000, category: '생활용품', tags: ['건강', '할인'], rating: 4.8, reviewCount: 1456, stock: 234, isNew: false, isBest: false, brand: 'SleepWell', specifications: { '소재': '겔 메모리폼', '크기': '60x40x12cm', '커버': '대나무 섬유 (탈착 가능)', '경도': '중간', '무게': '1.2kg' }, features: ['인체공학적 디자인', '경추 지지', '통풍 겔 메모리폼', '시원한 수면', '세탁 가능한 커버'], detailDescription: '<h3>SleepWell 메모리폼 베개</h3><p>경추를 바르게 받쳐주는 인체공학적 베개입니다. 겔 메모리폼으로 시원하고 편안한 수면을 경험하세요.</p>' },

  // 뷰티 (4개)
  { id: 27, name: '수분 크림 50ml', description: '히알루론산과 세라마이드가 함유된 고보습 크림입니다. 끈적임 없이 촉촉하게 피부를 가꿔주며, 민감성 피부도 사용 가능합니다.', price: 32000, category: '뷰티', tags: ['베스트'], rating: 4.7, reviewCount: 2134, stock: 456, isNew: false, isBest: true, brand: 'Hydro Skin', specifications: { '용량': '50ml', '주요성분': '히알루론산, 세라마이드', '피부타입': '모든 피부', '제조국': '한국', '유통기한': '제조일로부터 3년' }, features: ['히알루론산 고함량', '세라마이드 함유', '끈적임 없음', '민감성 피부 가능', '24시간 보습'], detailDescription: '<h3>Hydro Skin 수분 크림</h3><p>히알루론산과 세라마이드가 피부 장벽을 강화하고 깊은 보습을 제공합니다. 끈적임 없이 촉촉하게 흡수됩니다.</p>' },
  { id: 28, name: '비타민C 세럼 30ml', description: '순수 비타민C 10% 함유 세럼입니다. 피부 톤을 밝게 개선하고 잡티를 완화시켜 주며, 항산화 효과로 피부 노화를 방지합니다.', price: 45000, originalPrice: 59000, category: '뷰티', tags: ['신상', '할인'], rating: 4.8, reviewCount: 1678, stock: 234, isNew: true, isBest: true, brand: 'Bright Care', specifications: { '용량': '30ml', '주요성분': '순수 비타민C 10%', '피부타입': '모든 피부', '제조국': '한국', 'pH': '약산성' }, features: ['순수 비타민C 10%', '피부 톤 개선', '잡티 완화', '항산화 효과', '안정화 포뮬러'], detailDescription: '<h3>Bright Care 비타민C 세럼</h3><p>순수 비타민C 10%로 피부를 밝게 가꿔줍니다. 안정화 포뮬러로 자극 없이 흡수됩니다.</p>' },
  { id: 29, name: '선크림 SPF50+ PA++++', description: '무기자차 선크림으로 백탁 현상이 없고 촉촉합니다. SPF50+ PA++++ 강력한 자외선 차단 효과를 제공합니다.', price: 18000, category: '뷰티', tags: ['필수템'], rating: 4.6, reviewCount: 3456, stock: 678, isNew: false, isBest: false, brand: 'Sun Shield', specifications: { '용량': '50ml', 'SPF': 'SPF50+ PA++++', '성분': '무기자차', '제조국': '한국', '방수': '80분 지속' }, features: ['SPF50+ 강력 차단', '백탁 현상 없음', '촉촉한 사용감', '민감성 피부 가능', '방수 기능'], detailDescription: '<h3>Sun Shield 선크림</h3><p>무기자차 성분으로 피부에 자극이 적고 백탁 현상이 없습니다. 강력한 자외선 차단 효과로 피부를 보호하세요.</p>' },
  { id: 30, name: '클렌징 폼 150ml', description: '약산성 pH 밸런스 클렌징 폼입니다. 미세먼지와 노폐물을 깨끗하게 제거하며, 피부에 자극이 적고 촉촉함을 유지합니다.', price: 12000, category: '뷰티', tags: ['인기'], rating: 4.5, reviewCount: 2789, stock: 890, isNew: false, isBest: false, brand: 'Clean Face', specifications: { '용량': '150ml', 'pH': '약산성 (5.5)', '주요성분': '아미노산 계면활성제', '제조국': '한국', '피부타입': '모든 피부' }, features: ['약산성 pH 밸런스', '부드러운 세정', '촉촉한 마무리', '미세먼지 제거', '저자극 포뮬러'], detailDescription: '<h3>Clean Face 클렌징 폼</h3><p>약산성 pH로 피부 자극 없이 깨끗하게 세안할 수 있습니다. 미세먼지와 노폐물을 말끔하게 제거합니다.</p>' },
];

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
