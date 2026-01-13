import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography, Chip, Stack, Pagination } from '@mui/material';

// 더미 블로그 포스트 데이터
const DUMMY_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `포스트 제목 ${i + 1}`,
  excerpt: `내용 미리보기 ${i + 1} - 이 글은 블로그 포스트의 요약 내용입니다. 더 자세한 내용은 클릭하여 확인하세요.`,
  category: ['기술', '일상', '리뷰'][i % 3],
  date: `2024.01.${String(15 - i).padStart(2, '0')}`,
}));

const CATEGORIES = ['전체', '기술', '일상', '리뷰', '여행'];

const BlogPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 페이지 타이틀 */}
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        블로그
      </Typography>

      <Grid container spacing={4}>
        {/* 메인 콘텐츠 영역 */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* 포스트 목록 */}
          <Stack spacing={3}>
            {DUMMY_POSTS.map((post) => (
              <Card key={post.id} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <Grid container>
                  {/* 썸네일 이미지 영역 */}
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      sx={{
                        height: { xs: 160, sm: '100%' },
                        minHeight: 140,
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography color="text.secondary">이미지 {post.id}</Typography>
                    </Box>
                  </Grid>
                  {/* 포스트 내용 영역 */}
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <CardContent>
                      <Chip label={post.category} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.excerpt}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.date}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Stack>

          {/* 페이지네이션 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={5} color="primary" />
          </Box>
        </Grid>

        {/* 사이드바 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* 검색 영역 */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  검색
                </Typography>
                <Box
                  sx={{
                    height: 40,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    검색 입력창
                  </Typography>
                </Box>
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
                      sx={{
                        py: 1,
                        px: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'grey.100' },
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
                  {[1, 2, 3].map((num) => (
                    <Box key={num} sx={{ display: 'flex', gap: 2 }}>
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
                          썸네일 {num}
                        </Typography>
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                          인기 포스트 제목 {num}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          2024.01.{10 + num}
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
                  {['React', 'TypeScript', 'MUI', 'Vite', 'Node.js', 'CSS', 'JavaScript'].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPage;
