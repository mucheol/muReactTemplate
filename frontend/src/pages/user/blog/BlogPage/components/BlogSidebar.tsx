import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface BlogSidebarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
  onSearchKeyDown: (e: React.KeyboardEvent) => void;
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
  onSearchKeyDown,
  categories,
  selectedCategory,
  onCategoryClick,
  tags,
  selectedTag,
  onTagClick,
  popularPosts,
  searchQuery,
}) => {
  return (
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
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyDown={onSearchKeyDown}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {searchInput && (
                      <IconButton size="small" onClick={() => onSearchInputChange('')}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton size="small" onClick={onSearch}>
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
            {categories.map((category) => (
              <Box
                key={category}
                onClick={() => onCategoryClick(category)}
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
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant={selectedTag === tag ? 'filled' : 'outlined'}
                color={selectedTag === tag ? 'primary' : 'default'}
                onClick={() => onTagClick(tag)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};
