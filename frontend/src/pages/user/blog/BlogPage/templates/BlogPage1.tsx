import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  views: number;
}

interface BlogPage1Props {
  posts: BlogPost[];
  onClearFilter: () => void;
}

/**
 * 블로그 템플릿 1: 매거진 스타일 (큰 이미지 중심, 세로 레이아웃)
 */
export const BlogPage1: React.FC<BlogPage1Props> = ({ posts, onClearFilter }) => {
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
    <Stack spacing={4}>
      {posts.map((post, index) => (
        <Card
          key={post.id}
          sx={{
            cursor: 'pointer',
            '&:hover': { boxShadow: 6 },
            overflow: 'hidden',
          }}
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          {/* 큰 썸네일 이미지 */}
          <Box
            sx={{
              width: '100%',
              height: index === 0 ? 400 : 280,
              bgcolor: 'grey.300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              },
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Featured Image {post.id}
            </Typography>

            {/* 카테고리 뱃지 */}
            <Chip
              label={post.category}
              size="small"
              color="primary"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                fontWeight: 'bold',
              }}
            />
          </Box>

          {/* 컨텐츠 영역 */}
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant={index === 0 ? 'h4' : 'h5'}
              component="h2"
              sx={{
                mb: 2,
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.7,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.excerpt}
            </Typography>

            {/* 메타 정보 */}
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {post.date}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VisibilityIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {post.views}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
