import type { FaqItem, FaqCategory } from './types';

export const FAQ_LIST: FaqItem[] = [
  {
    id: 1,
    category: 'service',
    question: '서비스는 어떤 용도로 사용할 수 있나요?',
    answer:
      '본 서비스는 운영 현황 모니터링, 데이터 분석, 리포트 확인 등을 위해 사용할 수 있습니다. 관리자 페이지에서 대시보드, 통계, 설정 메뉴를 통해 다양한 기능을 제공합니다.',
    tags: ['서비스 소개', '기능'],
  },
  {
    id: 2,
    category: 'service',
    question: '지원하는 브라우저/환경이 어떻게 되나요?',
    answer:
      '최신 버전의 Chrome, Edge, Safari, Firefox를 권장합니다. 모바일 환경에서도 접속이 가능하나, 일부 기능은 PC 환경에 최적화되어 있습니다.',
    tags: ['환경', '브라우저'],
  },
  {
    id: 3,
    category: 'account',
    question: '회원가입은 어떻게 하나요?',
    answer:
      '상단 우측의 회원가입 버튼을 클릭한 뒤, 이메일과 비밀번호를 입력해 계정을 생성할 수 있습니다. 가입 후 이메일 인증을 완료해야 모든 기능을 이용할 수 있습니다.',
    tags: ['계정', '가입'],
  },
  {
    id: 4,
    category: 'account',
    question: '비밀번호를 잊어버렸습니다. 어떻게 해야 하나요?',
    answer:
      '로그인 화면에서 "비밀번호 찾기"를 클릭한 후, 가입하신 이메일 주소를 입력하면 비밀번호 재설정 메일이 발송됩니다. 메일의 안내에 따라 비밀번호를 변경해 주세요.',
    tags: ['비밀번호', '보안'],
  },
  {
    id: 5,
    category: 'payment',
    question: '결제 수단은 어떤 것들을 지원하나요?',
    answer:
      '신용카드, 계좌이체, 가상계좌, 간편결제(카카오페이, 네이버페이 등)를 지원합니다. 상세 결제 수단은 지역 및 계약 유형에 따라 달라질 수 있습니다.',
    tags: ['결제', '요금'],
  },
  {
    id: 6,
    category: 'payment',
    question: '청구서/영수증은 어디에서 확인할 수 있나요?',
    answer:
      '마이페이지의 "결제 내역" 메뉴에서 각 결제 건별 영수증과 세금계산서를 확인하고 다운로드할 수 있습니다.',
    tags: ['영수증', '세금계산서'],
  },
  {
    id: 7,
    category: 'etc',
    question: '고객센터 운영 시간은 어떻게 되나요?',
    answer:
      '고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다. 운영 시간 외에 접수된 문의는 영업일 기준으로 순차적으로 답변 드리고 있습니다.',
    tags: ['고객센터', '문의'],
  },
  {
    id: 8,
    category: 'etc',
    question: '원하는 질문이 없을 때는 어떻게 문의하나요?',
    answer:
      'FAQ에서 해결되지 않는 문의는 페이지 하단의 문의 채널(이메일, 1:1 문의, 연락처)을 통해 접수해 주세요. 가능한 한 빠르게 답변 드리겠습니다.',
    tags: ['문의 방법'],
  },
];

export const CATEGORY_LABELS: Record<FaqCategory, string> = {
  all: '전체',
  service: '서비스 이용',
  account: '계정/로그인',
  payment: '결제/요금',
  etc: '기타',
};

export const CARD_STYLE = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'grey.200',
  bgcolor: 'white',
} as const;
