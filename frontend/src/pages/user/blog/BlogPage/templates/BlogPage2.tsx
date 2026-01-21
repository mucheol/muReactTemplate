import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Button,
  CardActionArea,
} from '@mui/material';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  views: number;
}

interface BlogPage2Props {
  posts: BlogPost[];
  onClearFilter: () => void;
}

/**
 * 블로그 템플릿 2: 카드 그리드 스타일 (Pinterest 스타일)
 */
export const BlogPage2: React.FC<BlogPage2Props> = ({ posts, onClearFilter }) => {
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
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 8,
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate(`/blog/${post.id}`)}
              sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
              {/* 정사각형 썸네일 */}
              <Box
                sx={{
                  width: '100%',
                  paddingTop: '75%', // 4:3 비율
                  position: 'relative',
                  bgcolor: 'grey.200',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">Image {post.id}</Typography>
                </Box>

                {/* 오버레이 카테고리 */}
                <Chip
                  label={post.category}
                  size="small"
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 'bold',
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    lineHeight: 1.6,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.excerpt}
                </Typography>

                {/* 메타 정보 - 컴팩트하게 */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {post.date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    👁 {post.views}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
