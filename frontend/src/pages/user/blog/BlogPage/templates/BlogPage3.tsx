import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  views: number;
}

interface BlogPage3Props {
  posts: BlogPost[];
  onClearFilter: () => void;
}

/**
 * 블로그 템플릿 3: 타임라인 리스트 스타일 (미니멀리즘)
 */
export const BlogPage3: React.FC<BlogPage3Props> = ({ posts, onClearFilter }) => {
  const navigate = useNavigate();

  if (posts.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          포스트가 없습니다.
        </Typography>
        <Button variant="text" onClick={onClearFilter} sx={{ mt: 2 }}>
          전체 보기
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={0}>
      {posts.map((post, index) => (
        <React.Fragment key={post.id}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderRadius: 0,
              borderLeft: '4px solid transparent',
              '&:hover': {
                bgcolor: 'grey.50',
                borderLeftColor: 'primary.main',
                pl: 4,
              },
            }}
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              {/* 좌측: 작은 썸네일 */}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  flexShrink: 0,
                  bgcolor: 'grey.200',
                  borderRadius: 2,
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {post.id}
                </Typography>
              </Box>

              {/* 우측: 컨텐츠 */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* 카테고리 + 날짜 */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <RemoveRedEyeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {post.views}
                    </Typography>
                  </Box>
                </Stack>

                {/* 제목 */}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {post.title}
                </Typography>

                {/* 요약 */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    lineHeight: 1.7,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.excerpt}
                </Typography>

                {/* 더보기 링크 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    자세히 보기
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            </Box>
          </Paper>

          {index < posts.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Stack>
  );
};
