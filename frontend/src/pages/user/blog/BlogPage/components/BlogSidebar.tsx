import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import { SearchBar } from '../../../../../components/common/SearchBar';
import { CategoryList } from '../../../../../components/common/CategoryList';
import { TagCloud } from '../../../../../components/common/TagCloud';

interface BlogSidebarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
  tags: string[];
  selectedTag: string;
  onTagClick: (tag: string) => void;
  popularPosts: Array<{
    id: number;
    title: string;
    date: string;
    views: number;
  }>;
  searchQuery: string;
}

/**
 * 블로그 사이드바 (검색, 카테고리, 인기 포스트, 태그)
 */
export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  searchInput,
  onSearchInputChange,
  onSearch,
  onClearSearch,
  categories,
  selectedCategory,
  onCategoryClick,
  tags,
  selectedTag,
  onTagClick,
  popularPosts,
  searchQuery,
}) => {
  // 카테고리 활성화 체크 (검색/태그 필터가 없을 때만)
  const isCategoryActive = (category: string) => {
    return selectedCategory === category && !searchQuery && !selectedTag;
  };

  return (
    <Stack spacing={3}>
      {/* 검색 영역 */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            검색
          </Typography>
          <SearchBar
            value={searchInput}
            onChange={onSearchInputChange}
            onSearch={onSearch}
            onClear={onClearSearch}
            placeholder="검색어를 입력하세요"
            sx={{ mb: 0 }}
          />
        </CardContent>
      </Card>

      {/* 카테고리 */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            카테고리
          </Typography>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={onCategoryClick}
            isActive={isCategoryActive}
          />
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
          <TagCloud
            tags={tags}
            selectedTag={selectedTag}
            onTagClick={onTagClick}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};
