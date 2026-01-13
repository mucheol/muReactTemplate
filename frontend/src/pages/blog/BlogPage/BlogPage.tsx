import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Chip,
  Stack,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {
  ALL_POSTS,
  CATEGORIES,
  TAGS,
  getPopularPosts,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
} from '../data/blogData';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  // 검색어 입력 시 엔터키 처리
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
      {/* 페이지 타이틀 */}
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        블로그
      </Typography>

      {/* 현재 필터 표시 */}
      {filterLabel && (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={filterLabel}
            onDelete={handleClearFilter}
            color="primary"
            variant="outlined"
          />
          <Typography variant="body2" color="text.secondary">
            {filteredPosts.length}개의 포스트
          </Typography>
        </Box>
      )}

      {/* 메인 레이아웃 */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* 메인 콘텐츠 영역 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 66.67%' }, minWidth: 0 }}>
          {/* 포스트 목록 */}
          {paginatedPosts.length > 0 ? (
            <Stack spacing={3}>
              {paginatedPosts.map((post) => (
                <Card
                  key={post.id}
                  sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    {/* 썸네일 이미지 영역 */}
                    <Box
                      sx={{
                        width: { xs: '100%', sm: 180 },
                        height: { xs: 160, sm: 'auto' },
                        minHeight: { sm: 140 },
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography color="text.secondary">이미지 {post.id}</Typography>
                    </Box>
                    {/* 포스트 내용 영역 */}
                    <CardContent sx={{ flex: 1 }}>
                      <Chip label={post.category} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.excerpt}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          {post.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          조회수 {post.views}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                포스트가 없습니다.
              </Typography>
              <Button variant="text" onClick={handleClearFilter} sx={{ mt: 2 }}>
                전체 보기
              </Button>
            </Box>
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
          <Stack spacing={3}>
            {/* 검색 영역 */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  검색
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="검색어를 입력하세요"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {searchInput && (
                            <IconButton size="small" onClick={() => setSearchInput('')}>
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton size="small" onClick={handleSearch}>
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* 카테고리 */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  카테고리
                </Typography>
                <Stack spacing={1}>
                  {CATEGORIES.map((category) => (
                    <Box
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      sx={{
                        py: 1,
                        px: 2,
                        bgcolor:
                          selectedCategory === category && !searchQuery && !selectedTag
                            ? 'primary.light'
                            : 'grey.50',
                        color:
                          selectedCategory === category && !searchQuery && !selectedTag
                            ? 'primary.contrastText'
                            : 'text.primary',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor:
                            selectedCategory === category && !searchQuery && !selectedTag
                              ? 'primary.main'
                              : 'grey.100',
                        },
                      }}
                    >
                      <Typography variant="body2">{category}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* 인기 포스트 */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  인기 포스트
                </Typography>
                <Stack spacing={2}>
                  {popularPosts.map((post) => (
                    <Box
                      key={post.id}
                      component={RouterLink}
                      to={`/blog/${post.id}`}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { opacity: 0.8 },
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          썸네일
                        </Typography>
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                          {post.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.date} · 조회수 {post.views}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* 태그 클라우드 */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  태그
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant={selectedTag === tag ? 'filled' : 'outlined'}
                      color={selectedTag === tag ? 'primary' : 'default'}
                      onClick={() => handleTagClick(tag)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPage;
