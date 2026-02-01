import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { TemplateNumber } from '../../../types/template.types';
import { blogApi, type BlogPost, type PostPayload } from '../../../modules/blog';
import dayjs from 'dayjs';
import BlogPostDialog from './components/BlogPostDialog';

/**
 * 블로그 관리 페이지
 * - 템플릿 1, 2, 3 탭으로 구분
 * - 각 템플릿별 컨텐츠 관리
 */
const BlogManagementPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateNumber>(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 병렬로 데이터 가져오기
        const [postsRes, categoriesRes, tagsRes] = await Promise.all([
          blogApi.getPosts(),
          blogApi.getCategories(),
          blogApi.getTags(),
        ]);

        setPosts(postsRes.data);
        setCategories(categoriesRes.data);
        setAllTags(tagsRes.data);
      } catch (err) {
        console.error('데이터 조회 실패:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTemplateChange = (_event: React.SyntheticEvent, newValue: TemplateNumber) => {
    setSelectedTemplate(newValue);
  };

  // 선택된 템플릿에 해당하는 포스트만 필터링
  const filteredPosts = posts.filter((post) => post.template === selectedTemplate);

  const handleEdit = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setSelectedPost(post);
      setDialogOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await blogApi.deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error('포스트 삭제 실패:', err);
      alert('포스트 삭제에 실패했습니다.');
    }
  };

  const handleView = (id: number) => {
    window.open(`/blog/${id}`, '_blank');
  };

  const handleAddNew = () => {
    setSelectedPost(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPost(null);
  };

  const handleSavePost = async (payload: PostPayload) => {
    if (selectedPost) {
      // 수정
      const response = await blogApi.updatePost(selectedPost.id, payload);
      setPosts((prev) =>
        prev.map((post) => (post.id === selectedPost.id ? response.data : post))
      );
    } else {
      // 생성 - 현재 선택된 템플릿으로 생성
      const response = await blogApi.createPost({
        ...payload,
        template: selectedTemplate,
      });
      setPosts((prev) => [response.data, ...prev]);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          블로그 관리
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
          새 글 작성
        </Button>
      </Stack>

      <Card>
        <CardContent>
          {/* 템플릿 선택 탭 */}
          <Tabs value={selectedTemplate} onChange={handleTemplateChange} sx={{ mb: 3 }}>
            <Tab label="템플릿 1" value={1} />
            <Tab label="템플릿 2" value={2} />
            <Tab label="템플릿 3" value={3} />
          </Tabs>

          {/* 포스트 목록 테이블 */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>태그</TableCell>
                  <TableCell>조회수</TableCell>
                  <TableCell>작성일</TableCell>
                  <TableCell align="center">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography color="text.secondary" sx={{ py: 4 }}>
                        등록된 포스트가 없습니다.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id} hover>
                      <TableCell>{post.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {post.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.excerpt.slice(0, 50)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={post.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ mb: 0.5 }} />
                          ))}
                          {post.tags.length > 2 && (
                            <Chip label={`+${post.tags.length - 2}`} size="small" />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>{post.views.toLocaleString()}</TableCell>
                      <TableCell>{dayjs(post.date).format('YYYY.MM.DD')}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton size="small" onClick={() => handleView(post.id)} title="미리보기">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleEdit(post.id)} title="편집">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(post.id)}
                            title="삭제"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 포스트 생성/수정 다이얼로그 */}
      <BlogPostDialog
        open={dialogOpen}
        post={selectedPost}
        categories={categories}
        allTags={allTags}
        onClose={handleDialogClose}
        onSave={handleSavePost}
      />
    </Box>
  );
};

export default BlogManagementPage;
