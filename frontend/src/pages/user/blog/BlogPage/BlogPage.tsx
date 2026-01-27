import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { blogApi, type BlogPost } from '../../../../modules/blog';
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

  // 데이터 상태
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // URL 파라미터에서 상태 읽기
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedCategory = searchParams.get('category') || '전체';
  const selectedTag = searchParams.get('tag') || '';
  const searchQuery = searchParams.get('q') || '';

  // 검색 입력 상태
  const [searchInput, setSearchInput] = useState(searchQuery);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 포스트 목록 가져오기
        const params: { category?: string; tag?: string; search?: string } = {};
        if (searchQuery) {
          params.search = searchQuery;
        } else if (selectedTag) {
          params.tag = selectedTag;
        } else if (selectedCategory !== '전체') {
          params.category = selectedCategory;
        }

        const [postsResponse, popularResponse, categoriesResponse, tagsResponse] =
          await Promise.all([
            blogApi.getPosts(params),
            blogApi.getPopularPosts(),
            blogApi.getCategories(),
            blogApi.getTags(),
          ]);

        setPosts(postsResponse.data);
        setPopularPosts(popularResponse.data.slice(0, 3));
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, selectedTag, selectedCategory]);

  // 페이지네이션
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

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
        resultCount={posts.length}
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
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            tags={tags}
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
