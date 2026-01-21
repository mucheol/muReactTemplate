// 블로그 더미 데이터

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  views: number;
}

export const CATEGORIES = ['전체', '기술', '일상', '리뷰', '여행'];

export const TAGS = ['React', 'TypeScript', 'MUI', 'Vite', 'Node.js', 'CSS', 'JavaScript'];

// 전체 더미 포스트 (15개)
export const ALL_POSTS: BlogPost[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `포스트 제목 ${i + 1}`,
  excerpt: `내용 미리보기 ${i + 1} - 이 글은 블로그 포스트의 요약 내용입니다. 더 자세한 내용은 클릭하여 확인하세요.`,
  content: `
# 포스트 제목 ${i + 1}

이것은 포스트 ${i + 1}의 상세 내용입니다.

## 소개

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## 본문 내용

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### 세부 사항 1

- 항목 1
- 항목 2
- 항목 3

### 세부 사항 2

1. 첫 번째
2. 두 번째
3. 세 번째

## 결론

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
  `.trim(),
  category: ['기술', '일상', '리뷰', '여행'][i % 4],
  tags: TAGS.slice(i % 3, (i % 3) + 3),
  date: `2024.01.${String(15 - (i % 15)).padStart(2, '0')}`,
  views: Math.floor(Math.random() * 500) + 50,
}));

// 인기 포스트 (조회수 기준 상위 5개)
export const getPopularPosts = () => {
  return [...ALL_POSTS].sort((a, b) => b.views - a.views).slice(0, 5);
};

// 페이지별 포스트 가져오기
export const getPostsByPage = (page: number, perPage: number = 6) => {
  const start = (page - 1) * perPage;
  return ALL_POSTS.slice(start, start + perPage);
};

// 총 페이지 수
export const getTotalPages = (perPage: number = 6) => {
  return Math.ceil(ALL_POSTS.length / perPage);
};

// ID로 포스트 가져오기
export const getPostById = (id: number) => {
  return ALL_POSTS.find((post) => post.id === id);
};

// 카테고리로 필터링
export const getPostsByCategory = (category: string) => {
  if (category === '전체') return ALL_POSTS;
  return ALL_POSTS.filter((post) => post.category === category);
};

// 태그로 필터링
export const getPostsByTag = (tag: string) => {
  return ALL_POSTS.filter((post) => post.tags.includes(tag));
};

// 검색
export const searchPosts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return ALL_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
  );
};
