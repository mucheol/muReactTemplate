import React from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPostById, getPopularPosts, CATEGORIES, TAGS } from '../data/blogData';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = getPostById(Number(id));
  const popularPosts = getPopularPosts().slice(0, 3);

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">포스트를 찾을 수 없습니다.</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/blog')} sx={{ mt: 2 }}>
          블로그 목록으로
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 뒤로가기 */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/blog')} sx={{ mb: 3 }}>
        목록으로
      </Button>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* 메인 콘텐츠 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 66.67%' }, minWidth: 0 }}>
          {/* 포스트 헤더 */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip
                label={post.category}
                size="small"
                component={RouterLink}
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                clickable
              />
            </Stack>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.date} · 조회수 {post.views}
            </Typography>
          </Box>

          {/* 썸네일 이미지 */}
          <Box
            sx={{
              width: '100%',
              height: 300,
              bgcolor: 'grey.200',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography color="text.secondary">대표 이미지</Typography>
          </Box>

          {/* 본문 내용 */}
          <Box sx={{ mb: 4 }}>
            {post.content.split('\n').map((line, idx) => {
              if (line.startsWith('# ')) {
                return (
                  <Typography key={idx} variant="h4" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
                    {line.replace('# ', '')}
                  </Typography>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <Typography key={idx} variant="h5" sx={{ fontWeight: 'bold', mt: 3, mb: 1.5 }}>
                    {line.replace('## ', '')}
                  </Typography>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <Typography key={idx} variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                    {line.replace('### ', '')}
                  </Typography>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <Typography key={idx} variant="body1" sx={{ pl: 2, mb: 0.5 }}>
                    • {line.replace('- ', '')}
                  </Typography>
                );
              }
              if (/^\d+\. /.test(line)) {
                return (
                  <Typography key={idx} variant="body1" sx={{ pl: 2, mb: 0.5 }}>
                    {line}
                  </Typography>
                );
              }
              if (line.trim() === '') {
                return <Box key={idx} sx={{ height: 16 }} />;
              }
              return (
                <Typography key={idx} variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
                  {line}
                </Typography>
              );
            })}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* 태그 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              태그
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  component={RouterLink}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  clickable
                />
              ))}
            </Stack>
          </Box>
        </Box>

        {/* 사이드바 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 33.33%' }, maxWidth: { md: 320 } }}>
          <Stack spacing={3}>
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
                      component={RouterLink}
                      to={`/blog?category=${encodeURIComponent(category)}`}
                      sx={{
                        py: 1,
                        px: 2,
                        bgcolor: post.category === category ? 'primary.light' : 'grey.50',
                        color: post.category === category ? 'primary.contrastText' : 'text.primary',
                        borderRadius: 1,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        '&:hover': { bgcolor: post.category === category ? 'primary.main' : 'grey.100' },
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
                  {popularPosts.map((p) => (
                    <Box
                      key={p.id}
                      component={RouterLink}
                      to={`/blog/${p.id}`}
                      sx={{ display: 'flex', gap: 2, textDecoration: 'none', color: 'inherit' }}
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
                          {p.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {p.date}
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
                      variant={post.tags.includes(tag) ? 'filled' : 'outlined'}
                      component={RouterLink}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      clickable
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

export default BlogDetailPage;
