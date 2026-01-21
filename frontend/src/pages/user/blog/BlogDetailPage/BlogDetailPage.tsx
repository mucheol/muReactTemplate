import React, { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { getPostById, getPopularPosts, CATEGORIES, TAGS } from '../data/blogData';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = getPostById(Number(id));
  const popularPosts = getPopularPosts().slice(0, 3);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: '김철수', date: '2024-01-15', content: '정말 유익한 글입니다. 감사합니다!' },
    { id: 2, author: '이영희', date: '2024-01-16', content: '이해하기 쉽게 설명해주셔서 감사합니다.' },
  ]);

  // 목차 추출
  const tableOfContents = post
    ? post.content
        .split('\n')
        .filter((line) => line.startsWith('#'))
        .map((line, idx) => ({
          id: idx,
          level: line.match(/^#+/)?.[0].length || 1,
          title: line.replace(/^#+\s*/, ''),
        }))
    : [];

  // 이전/다음 포스트
  const currentId = Number(id);
  const prevPost = getPostById(currentId - 1);
  const nextPost = getPostById(currentId + 1);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다!');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
    }
    setShowShareMenu(false);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: '사용자',
          date: new Date().toLocaleDateString('ko-KR'),
          content: comment,
        },
      ]);
      setComment('');
    }
  };

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
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
              {post.title}
            </Typography>

            {/* 작성자 정보 및 메타 정보 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>작</Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    관리자
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.date} · 조회수 {post.views} · {Math.ceil(post.content.length / 500)}분 읽기
                  </Typography>
                </Box>
              </Stack>

              {/* 좋아요/북마크/공유 */}
              <Stack direction="row" spacing={1}>
                <Tooltip title={liked ? '좋아요 취소' : '좋아요'}>
                  <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Typography sx={{ display: 'flex', alignItems: 'center', px: 1 }}>{likeCount}</Typography>
                <Tooltip title={bookmarked ? '북마크 취소' : '북마크'}>
                  <IconButton onClick={() => setBookmarked(!bookmarked)} color={bookmarked ? 'primary' : 'default'}>
                    {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="공유하기">
                  <IconButton onClick={() => setShowShareMenu(!showShareMenu)}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            {/* 공유 메뉴 */}
            {showShareMenu && (
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 10,
                  p: 2,
                  mt: 1,
                }}
              >
                <Stack spacing={1}>
                  <Button startIcon={<LinkIcon />} onClick={() => handleShare('copy')} fullWidth>
                    링크 복사
                  </Button>
                  <Button startIcon={<FacebookIcon />} onClick={() => handleShare('facebook')} fullWidth>
                    Facebook
                  </Button>
                  <Button startIcon={<TwitterIcon />} onClick={() => handleShare('twitter')} fullWidth>
                    Twitter
                  </Button>
                </Stack>
              </Paper>
            )}
          </Box>

          {/* 썸네일 이미지 */}
          <Box
            sx={{
              width: '100%',
              height: 400,
              bgcolor: 'grey.200',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography color="text.secondary" variant="h6">
              대표 이미지
            </Typography>
          </Box>

          {/* 본문 내용 */}
          <Box sx={{ mb: 4, '& img': { maxWidth: '100%', height: 'auto' } }}>
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
                <Typography key={idx} variant="body1" sx={{ mb: 1, lineHeight: 1.8, color: 'text.primary' }}>
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

          <Divider sx={{ my: 4 }} />

          {/* 이전/다음 포스트 네비게이션 */}
          <Box sx={{ mb: 4 }}>
            <Stack spacing={2}>
              {prevPost && (
                <Card
                  component={RouterLink}
                  to={`/blog/${prevPost.id}`}
                  sx={{
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <ArrowBackIosIcon fontSize="small" color="primary" />
                      <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                        이전 글
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {prevPost.title}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              {nextPost && (
                <Card
                  component={RouterLink}
                  to={`/blog/${nextPost.id}`}
                  sx={{
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <ArrowForwardIcon fontSize="small" color="primary" />
                      <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                        다음 글
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {nextPost.title}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* 댓글 섹션 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              댓글 {comments.length}개
            </Typography>

            {/* 댓글 입력 */}
            <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
              <CardContent>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="댓글을 작성해주세요..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 2, bgcolor: 'white' }}
                />
                <Button variant="contained" onClick={handleCommentSubmit} disabled={!comment.trim()}>
                  댓글 등록
                </Button>
              </CardContent>
            </Card>

            {/* 댓글 목록 */}
            <Stack spacing={2}>
              {comments.map((c) => (
                <Card key={c.id}>
                  <CardContent>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>{c.author[0]}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {c.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.date}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {c.content}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* 관련 포스트 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              관련 포스트
            </Typography>
            <Stack spacing={2}>
              {popularPosts.slice(0, 2).map((p) => (
                <Card
                  key={p.id}
                  component={RouterLink}
                  to={`/blog/${p.id}`}
                  sx={{
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
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
                      <Box sx={{ flex: 1 }}>
                        <Chip label={p.category} size="small" sx={{ mb: 1 }} />
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {p.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {p.excerpt}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {p.date} · 조회수 {p.views}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* 사이드바 */}
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 33.33%' }, maxWidth: { md: 320 } }}>
          <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 20 } }}>
            {/* 목차 */}
            {tableOfContents.length > 0 && (
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <FormatListBulletedIcon fontSize="small" color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      목차
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    {tableOfContents.map((item) => (
                      <Link
                        key={item.id}
                        href={`#section-${item.id}`}
                        underline="hover"
                        sx={{
                          pl: (item.level - 1) * 2,
                          py: 0.5,
                          display: 'block',
                          color: 'text.secondary',
                          fontSize: '0.875rem',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}

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
                        transition: 'all 0.2s',
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
                      sx={{
                        display: 'flex',
                        gap: 2,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateX(4px)' },
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
