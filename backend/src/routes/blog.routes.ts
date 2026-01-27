/**
 * 블로그 관련 API 라우트
 */

import express = require('express');
const router = express.Router();

/**
 * 블로그 포스트 인터페이스
 */
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  views: number;
  thumbnail?: string;
  author?: string;
}

/**
 * 카테고리 목록
 */
const CATEGORIES = ['전체', '기술', '일상', '리뷰', '여행'];

/**
 * 태그 목록
 */
const TAGS = ['React', 'TypeScript', 'MUI', 'Vite', 'Node.js', 'CSS', 'JavaScript', 'Frontend', 'Backend', 'DevOps'];

/**
 * 블로그 포스트 데이터 (10개)
 */
const POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'React 19의 새로운 기능들 완벽 정리',
    excerpt: 'React 19에서 새롭게 추가된 주요 기능들을 살펴봅니다. Server Components, Actions, 그리고 개선된 Hooks에 대해 자세히 알아보세요.',
    content: `# React 19의 새로운 기능들 완벽 정리

React 19가 정식 출시되면서 많은 개발자들이 기대했던 기능들이 추가되었습니다. 이번 포스트에서는 React 19의 핵심 기능들을 살펴보겠습니다.

## React Server Components

React Server Components는 서버에서만 실행되는 컴포넌트로, 클라이언트 번들 크기를 줄이고 초기 로딩 속도를 개선할 수 있습니다.

\`\`\`tsx
// ServerComponent.tsx
async function BlogPost({ id }: { id: string }) {
  const post = await db.post.findUnique({ where: { id } });
  return <article>{post.content}</article>;
}
\`\`\`

### 장점
- 번들 크기 감소
- 데이터베이스 직접 접근 가능
- 초기 렌더링 성능 향상

## Actions와 useTransition

Actions를 통해 폼 제출과 데이터 변경을 더 쉽게 처리할 수 있습니다.

\`\`\`tsx
function CommentForm() {
  const [isPending, startTransition] = useTransition();

  async function submitComment(formData: FormData) {
    startTransition(async () => {
      await postComment(formData);
    });
  }

  return (
    <form action={submitComment}>
      <input name="comment" />
      <button disabled={isPending}>
        {isPending ? '전송 중...' : '댓글 작성'}
      </button>
    </form>
  );
}
\`\`\`

## use Hook

새로운 \`use\` Hook을 통해 Promise와 Context를 더 직관적으로 사용할 수 있습니다.

\`\`\`tsx
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
\`\`\`

## 결론

React 19는 개발자 경험과 성능 모두를 개선하는 중요한 업데이트입니다. Server Components와 Actions를 활용하면 더 나은 웹 애플리케이션을 만들 수 있습니다.`,
    category: '기술',
    tags: ['React', 'Frontend', 'JavaScript'],
    date: '2024.01.15',
    views: 523,
    author: '김개발',
  },
  {
    id: 2,
    title: 'TypeScript 5.3 새로운 기능과 마이그레이션 가이드',
    excerpt: 'TypeScript 5.3 버전의 주요 변경사항과 기존 프로젝트를 업그레이드하는 방법을 단계별로 설명합니다.',
    content: `# TypeScript 5.3 새로운 기능과 마이그레이션 가이드

TypeScript 5.3이 출시되면서 타입 안정성과 개발자 경험이 크게 개선되었습니다.

## Import Attributes

JSON 모듈을 안전하게 가져올 수 있는 새로운 문법이 추가되었습니다.

\`\`\`typescript
import data from "./data.json" with { type: "json" };
\`\`\`

## Switch(true) 타입 좁히기 개선

switch 문에서의 타입 좁히기가 더 똑똑해졌습니다.

\`\`\`typescript
function example(value: string | number) {
  switch (true) {
    case typeof value === "string":
      console.log(value.toUpperCase()); // string으로 타입 좁히기 성공
      break;
    case typeof value === "number":
      console.log(value.toFixed(2)); // number로 타입 좁히기 성공
      break;
  }
}
\`\`\`

## 마이그레이션 가이드

기존 프로젝트를 5.3으로 업그레이드하는 방법입니다.

\`\`\`bash
npm install -D typescript@5.3
\`\`\`

## 결론

TypeScript 5.3은 개발자 경험을 크게 향상시키는 업데이트입니다.`,
    category: '기술',
    tags: ['TypeScript', 'JavaScript'],
    date: '2024.01.12',
    views: 412,
    author: '이타입',
  },
  {
    id: 3,
    title: 'Vite로 React 프로젝트 시작하기',
    excerpt: 'Vite를 사용하여 빠르고 현대적인 React 개발 환경을 구축하는 방법을 알아봅니다.',
    content: `# Vite로 React 프로젝트 시작하기

Vite는 빠른 개발 서버와 최적화된 빌드를 제공하는 차세대 프론트엔드 빌드 툴입니다.

## Vite의 장점

- ⚡ 번개같이 빠른 HMR (Hot Module Replacement)
- 📦 최적화된 프로덕션 빌드
- 🛠️ 풍부한 플러그인 생태계
- 🔧 간단한 설정

## 프로젝트 생성

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
\`\`\`

## Vite 설정 최적화

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
\`\`\`

## 결론

Vite는 React 개발을 더 빠르고 즐겁게 만들어줍니다.`,
    category: '기술',
    tags: ['Vite', 'React', 'Frontend'],
    date: '2024.01.10',
    views: 389,
    author: '박빠른',
  },
  {
    id: 4,
    title: 'MUI (Material-UI) 디자인 시스템 활용법',
    excerpt: 'Material-UI를 사용하여 일관되고 아름다운 UI를 빠르게 구축하는 방법을 소개합니다.',
    content: `# MUI (Material-UI) 디자인 시스템 활용법

MUI는 React를 위한 가장 인기있는 UI 라이브러리입니다.

## MUI 설치

\`\`\`bash
npm install @mui/material @emotion/react @emotion/styled
\`\`\`

## 기본 컴포넌트 사용

\`\`\`tsx
import { Button, TextField, Box } from '@mui/material';

function LoginForm() {
  return (
    <Box sx={{ p: 3 }}>
      <TextField label="이메일" fullWidth sx={{ mb: 2 }} />
      <TextField label="비밀번호" type="password" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" fullWidth>
        로그인
      </Button>
    </Box>
  );
}
\`\`\`

## 테마 커스터마이징

\`\`\`tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* 앱 컴포넌트 */}
    </ThemeProvider>
  );
}
\`\`\`

## 결론

MUI를 사용하면 빠르고 일관된 UI를 구축할 수 있습니다.`,
    category: '기술',
    tags: ['MUI', 'React', 'CSS'],
    date: '2024.01.08',
    views: 456,
    author: '최디자인',
  },
  {
    id: 5,
    title: '효율적인 React 상태 관리 전략',
    excerpt: 'useState, useReducer, Context API, 그리고 외부 라이브러리까지 다양한 상태 관리 방법을 비교 분석합니다.',
    content: `# 효율적인 React 상태 관리 전략

React에서 상태 관리는 애플리케이션의 복잡도에 따라 다양한 방법으로 접근할 수 있습니다.

## useState - 간단한 로컬 상태

\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## useReducer - 복잡한 상태 로직

\`\`\`tsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}
\`\`\`

## Context API - 전역 상태

\`\`\`tsx
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* 앱 컴포넌트 */}
    </UserContext.Provider>
  );
}
\`\`\`

## 결론

상황에 맞는 상태 관리 방법을 선택하는 것이 중요합니다.`,
    category: '기술',
    tags: ['React', 'Frontend', 'JavaScript'],
    date: '2024.01.05',
    views: 601,
    author: '정상태',
  },
  {
    id: 6,
    title: '개발자를 위한 VSCode 필수 확장 프로그램 10선',
    excerpt: '생산성을 극대화하는 VSCode 확장 프로그램들을 소개하고, 각각의 활용법을 알아봅니다.',
    content: `# 개발자를 위한 VSCode 필수 확장 프로그램 10선

VSCode는 다양한 확장 프로그램으로 더욱 강력해집니다.

## 1. ESLint

코드 품질을 자동으로 체크하고 수정합니다.

## 2. Prettier

일관된 코드 포맷팅을 제공합니다.

## 3. GitLens

Git 히스토리를 시각화하고 협업을 쉽게 만듭니다.

## 4. Thunder Client

VSCode 내에서 API 테스트를 할 수 있습니다.

## 5. Auto Rename Tag

HTML/JSX 태그를 자동으로 리네임합니다.

## 결론

이 확장 프로그램들로 개발 생산성을 높여보세요!`,
    category: '일상',
    tags: ['DevOps', 'Frontend'],
    date: '2024.01.03',
    views: 734,
    author: '강확장',
  },
  {
    id: 7,
    title: '프론트엔드 성능 최적화 완벽 가이드',
    excerpt: '웹사이트 로딩 속도를 개선하고 사용자 경험을 향상시키는 다양한 최적화 기법들을 다룹니다.',
    content: `# 프론트엔드 성능 최적화 완벽 가이드

웹사이트 성능은 사용자 경험과 직결됩니다.

## 이미지 최적화

- WebP 포맷 사용
- Lazy Loading 적용
- 적절한 크기로 리사이징

## 코드 스플리팅

\`\`\`tsx
const LazyComponent = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## 번들 크기 최적화

- Tree Shaking 활용
- 불필요한 라이브러리 제거
- Dynamic Import 사용

## 결론

작은 최적화가 모여 큰 성능 향상을 만듭니다.`,
    category: '기술',
    tags: ['Frontend', 'JavaScript'],
    date: '2024.01.01',
    views: 823,
    author: '윤최적',
  },
  {
    id: 8,
    title: 'Node.js와 Express로 REST API 만들기',
    excerpt: 'Node.js와 Express를 사용하여 실전에서 사용 가능한 REST API를 구축하는 방법을 단계별로 설명합니다.',
    content: `# Node.js와 Express로 REST API 만들기

백엔드 개발의 기초, REST API를 만들어봅시다.

## Express 서버 설정

\`\`\`typescript
import express from 'express';
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## CRUD API 구현

\`\`\`typescript
// GET
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// POST
app.post('/api/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});
\`\`\`

## 미들웨어 활용

\`\`\`typescript
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});
\`\`\`

## 결론

Express로 간단하게 REST API를 구축할 수 있습니다.`,
    category: '기술',
    tags: ['Node.js', 'Backend', 'JavaScript'],
    date: '2023.12.28',
    views: 567,
    author: '송백엔드',
  },
  {
    id: 9,
    title: '제주도 3박 4일 개발자 워케이션 후기',
    excerpt: '일과 여행을 동시에! 제주도에서의 워케이션 경험과 추천 장소들을 공유합니다.',
    content: `# 제주도 3박 4일 개발자 워케이션 후기

코딩하기 좋은 카페와 제주도의 아름다운 풍경을 동시에!

## Day 1 - 서귀포 도착

제주 공항에서 렌트카를 빌려 서귀포로 향했습니다.

## Day 2 - 코워킹 스페이스

서귀포의 바다가 보이는 코워킹 스페이스에서 작업했습니다.

## Day 3 - 한라산 등반

오전에는 한라산, 오후에는 카페에서 코딩!

## Day 4 - 귀가

아침 일찍 공항으로 향하며 워케이션 마무리.

## 결론

워케이션, 정말 추천합니다!`,
    category: '여행',
    tags: ['Frontend'],
    date: '2023.12.25',
    views: 892,
    author: '임여행',
  },
  {
    id: 10,
    title: 'MacBook Pro M3 개발자 리뷰',
    excerpt: 'M3 칩셋이 탑재된 MacBook Pro를 개발 용도로 2주간 사용해본 솔직한 후기입니다.',
    content: `# MacBook Pro M3 개발자 리뷰

M3 MacBook Pro를 2주간 사용해본 후기입니다.

## 성능

- Docker 컨테이너: 매우 빠름
- Node.js 빌드: 이전 모델 대비 2배 빠름
- React 개발 서버: 즉각 반응

## 배터리

하루 종일 코딩해도 충분한 배터리 수명!

## 단점

- 높은 가격
- 무게가 다소 무거움

## 결론

개발자에게 정말 추천하는 노트북입니다.`,
    category: '리뷰',
    tags: ['DevOps'],
    date: '2023.12.20',
    views: 1245,
    author: '한리뷰',
  },
];

/**
 * API 엔드포인트 1: 블로그 포스트 목록 조회
 *
 * GET /api/blog/posts
 *
 * 쿼리 파라미터:
 * - category: 카테고리 필터
 * - tag: 태그 필터
 * - search: 검색어
 */
router.get('/posts', (req, res) => {
  try {
    let posts = [...POSTS];

    // 카테고리 필터
    const category = req.query.category as string;
    if (category && category !== '전체') {
      posts = posts.filter(post => post.category === category);
    }

    // 태그 필터
    const tag = req.query.tag as string;
    if (tag) {
      posts = posts.filter(post => post.tags.includes(tag));
    }

    // 검색
    const search = req.query.search as string;
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '포스트 목록 조회 실패',
    });
  }
});

/**
 * API 엔드포인트 2: 특정 포스트 조회
 *
 * GET /api/blog/posts/:id
 */
router.get('/posts/:id', (req, res) => {
  try {
    const postId = Number(req.params.id);
    const post = POSTS.find(p => p.id === postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '포스트를 찾을 수 없습니다',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '포스트 조회 실패',
    });
  }
});

/**
 * API 엔드포인트 3: 카테고리 목록 조회
 *
 * GET /api/blog/categories
 */
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    data: CATEGORIES,
  });
});

/**
 * API 엔드포인트 4: 태그 목록 조회
 *
 * GET /api/blog/tags
 */
router.get('/tags', (req, res) => {
  res.json({
    success: true,
    data: TAGS,
  });
});

/**
 * API 엔드포인트 5: 인기 포스트 조회
 *
 * GET /api/blog/posts/popular
 */
router.get('/popular', (req, res) => {
  try {
    const popularPosts = [...POSTS]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    res.json({
      success: true,
      data: popularPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '인기 포스트 조회 실패',
    });
  }
});

export = router;
