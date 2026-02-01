import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import type { BlogPost, PostPayload } from '../../../../modules/blog';

interface BlogPostDialogProps {
  open: boolean;
  post: BlogPost | null;
  categories: string[];
  allTags: string[];
  onClose: () => void;
  onSave: (payload: PostPayload) => Promise<void>;
}

/**
 * 블로그 포스트 생성/수정 다이얼로그
 */
const BlogPostDialog: React.FC<BlogPostDialogProps> = ({
  open,
  post,
  categories,
  allTags,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PostPayload>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    template: 1,
    author: '',
    thumbnail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 포스트 데이터로 폼 초기화
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags || [],
        template: post.template || 1,
        author: post.author || '',
        thumbnail: post.thumbnail || '',
      });
    } else {
      // 새 글 작성 시 폼 초기화
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: categories.filter(c => c !== '전체')[0] || '',
        tags: [],
        template: 1,
        author: '',
        thumbnail: '',
      });
    }
    setError(null);
  }, [post, categories, open]);

  const handleChange = (field: keyof PostPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!formData.excerpt.trim()) {
      setError('요약을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    if (!formData.category) {
      setError('카테고리를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(formData);
      onClose();
    } catch (err: any) {
      console.error('포스트 저장 실패:', err);
      setError(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // '전체' 카테고리를 제외한 실제 카테고리 목록
  const validCategories = categories.filter(c => c !== '전체');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{post ? '포스트 수정' : '새 포스트 작성'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="제목"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="포스트 제목을 입력하세요"
          />

          <TextField
            label="요약"
            fullWidth
            required
            multiline
            rows={2}
            value={formData.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="포스트 요약을 입력하세요 (2-3줄)"
          />

          <TextField
            label="내용"
            fullWidth
            required
            multiline
            rows={8}
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="포스트 본문 내용을 입력하세요"
          />

          <Stack direction="row" spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>카테고리</InputLabel>
              <Select
                value={formData.category}
                label="카테고리"
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {validCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>템플릿</InputLabel>
              <Select
                value={formData.template}
                label="템플릿"
                onChange={(e) => handleChange('template', e.target.value)}
              >
                <MenuItem value={1}>템플릿 1</MenuItem>
                <MenuItem value={2}>템플릿 2</MenuItem>
                <MenuItem value={3}>템플릿 3</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Autocomplete
            multiple
            options={allTags}
            freeSolo
            value={formData.tags}
            onChange={(_, newValue) => handleChange('tags', newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...rest } = getTagProps({ index });
                return <Chip key={key} label={option} {...rest} />;
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="태그"
                placeholder="태그를 입력하고 Enter를 누르세요"
                helperText="기존 태그를 선택하거나 새로운 태그를 입력할 수 있습니다"
              />
            )}
          />

          <TextField
            label="작성자"
            fullWidth
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            placeholder="작성자 이름 (선택사항)"
          />

          <TextField
            label="썸네일 URL"
            fullWidth
            value={formData.thumbnail}
            onChange={(e) => handleChange('thumbnail', e.target.value)}
            placeholder="썸네일 이미지 URL (선택사항)"
          />

          {formData.thumbnail && (
            <Box>
              <img
                src={formData.thumbnail}
                alt="썸네일 미리보기"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          취소
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogPostDialog;
