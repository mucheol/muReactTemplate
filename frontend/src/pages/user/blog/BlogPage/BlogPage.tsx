import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Pagination,
} from '@mui/material';
import {
  ALL_POSTS,
  CATEGORIES,
  TAGS,
  getPopularPosts,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
} from '../data/blogData';
import { FilterResultBar } from '../../../../components/common/FilterResultBar';
import { BlogSidebar } from './components/BlogSidebar';
import { TemplateSelector } from './components/TemplateSelector';
import { BlogPage1 } from './templates/BlogPage1';
import { BlogPage2 } from './templates/BlogPage2';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 템플릿 선택 상태 (1, 2)
  const [selectedTemplate, setSelectedTemplate] = useState<1 | 2>(1);

  // URL 파라미터에서 상태 읽기
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedCategory = searchParams.get('category') || '전체';
  const selectedTag = searchParams.get('tag') || '';
  const searchQuery = searchParams.get('q') || '';

  // 검색 입력 상태
  const [searchInput, setSearchInput] = useState(searchQuery);

  // 인기 포스트
  const popularPosts = useMemo(() => getPopularPosts().slice(0, 3), []);

  // 필터링된 포스트 목록
  const filteredPosts = useMemo(() => {
    let posts = ALL_POSTS;

    // 검색어 필터
    if (searchQuery) {
      posts = searchPosts(searchQuery);
    }
    // 태그 필터
    else if (selectedTag) {
      posts = getPostsByTag(selectedTag);
    }
    // 카테고리 필터
    else if (selectedCategory !== '전체') {
      posts = getPostsByCategory(selectedCategory);
    }

    return posts;
  }, [searchQuery, selectedTag, selectedCategory]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // 페이지 변경
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  };

  // 카테고리 선택
  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    if (category !== '전체') {
      params.set('category', category);
    }
    setSearchParams(params);
    setSearchInput('');
  };

  // 태그 선택
  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams();
    params.set('tag', tag);
    setSearchParams(params);
    setSearchInput('');
  };

  // 검색 실행
  const handleSearch = () => {
    if (searchInput.trim()) {
      const params = new URLSearchParams();
      params.set('q', searchInput.trim());
      setSearchParams(params);
    }
  };

  // 검색어 초기화
  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    setSearchParams(params);
  };

  // 필터 초기화
  const handleClearFilter = () => {
    setSearchParams({});
    setSearchInput('');
  };

  // 현재 필터 상태 표시
  const getFilterLabel = () => {
    if (searchQuery) return `검색: "${searchQuery}"`;
    if (selectedTag) return `태그: ${selectedTag}`;
    if (selectedCategory !== '전체') return `카테고리: ${selectedCategory}`;
    return null;
  };

  const filterLabel = getFilterLabel();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 페이지 타이틀 + 템플릿 선택 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          블로그
        </Typography>

        {/* 템플릿 선택 버튼 */}
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />
      </Box>

      {/* 현재 필터 표시 */}
      <FilterResultBar
        filterLabel={filterLabel}
        resultCount={filteredPosts.length}
        onClearFilter={handleClearFilter}
        countLabel="개의 포스트"
      />

      {/* 메인 레이아웃 */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* 메인 콘텐츠 영역 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 66.67%' }, minWidth: 0 }}>
          {/* 선택된 템플릿 렌더링 */}
          {selectedTemplate === 1 && (
            <BlogPage1 posts={paginatedPosts} onClearFilter={handleClearFilter} />
          )}
          {selectedTemplate === 2 && (
            <BlogPage2 posts={paginatedPosts} onClearFilter={handleClearFilter} />
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Box>

        {/* 사이드바 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 33.33%' }, maxWidth: { md: 320 } }}>
          <BlogSidebar
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            tags={TAGS}
            selectedTag={selectedTag}
            onTagClick={handleTagClick}
            popularPosts={popularPosts}
            searchQuery={searchQuery}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPage;
