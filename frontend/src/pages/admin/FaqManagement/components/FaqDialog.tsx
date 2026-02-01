import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  Typography,
  Autocomplete,
  Chip,
} from '@mui/material';
import type { FaqItem, FaqPayload, FaqCategory } from '../../../../modules/faq';
import RichTextEditor from '../../../../components/editor/RichTextEditor';

const CATEGORY_OPTIONS: { value: FaqCategory; label: string }[] = [
  { value: 'service', label: '서비스 이용' },
  { value: 'account', label: '계정/회원' },
  { value: 'payment', label: '결제/환불' },
  { value: 'etc', label: '기타' },
];

interface FaqDialogProps {
  open: boolean;
  item: FaqItem | null;
  allTags: string[];
  onClose: () => void;
  onSave: (payload: FaqPayload) => Promise<void>;
}

/**
 * FAQ 생성/수정 다이얼로그
 */
const FaqDialog: React.FC<FaqDialogProps> = ({ open, item, allTags, onClose, onSave }) => {
  const [formData, setFormData] = useState<FaqPayload>({
    category: 'service',
    question: '',
    answer: '',
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FAQ 데이터로 폼 초기화
  useEffect(() => {
    if (item) {
      setFormData({
        category: item.category === 'all' ? 'service' : item.category,
        question: item.question,
        answer: item.answer,
        tags: item.tags || [],
      });
    } else {
      // 새 FAQ 작성 시 폼 초기화
      setFormData({
        category: 'service',
        question: '',
        answer: '',
        tags: [],
      });
    }
    setError(null);
  }, [item, open]);

  const handleChange = (field: keyof FaqPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.question.trim()) {
      setError('질문을 입력해주세요.');
      return;
    }
    if (!formData.answer.trim()) {
      setError('답변을 입력해주세요.');
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
      console.error('FAQ 저장 실패:', err);
      setError(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{item ? 'FAQ 수정' : '새 FAQ 등록'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <FormControl fullWidth required>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={formData.category}
              label="카테고리"
              onChange={(e) => handleChange('category', e.target.value as FaqCategory)}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="질문"
            fullWidth
            required
            value={formData.question}
            onChange={(e) => handleChange('question', e.target.value)}
            placeholder="자주 묻는 질문을 입력하세요"
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              답변
            </Typography>
            <RichTextEditor
              content={formData.answer}
              onChange={(content) => handleChange('answer', content)}
              placeholder="답변 내용을 입력하세요..."
            />
          </Box>

          <Autocomplete
            multiple
            options={allTags}
            freeSolo
            value={formData.tags || []}
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
                helperText="검색을 위한 키워드를 입력하세요"
              />
            )}
          />
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

export default FaqDialog;
