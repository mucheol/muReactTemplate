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
  Alert,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import type { Product, ProductPayload } from '../../../../modules/shop';
import RichTextEditor from '../../../../components/editor/RichTextEditor';
import ImageUpload from '../../../../components/upload/ImageUpload';

interface ProductDialogProps {
  open: boolean;
  product: Product | null;
  categories: string[];
  allTags: string[];
  onClose: () => void;
  onSave: (payload: ProductPayload) => Promise<void>;
}

/**
 * 상품 생성/수정 다이얼로그
 */
const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  product,
  categories,
  allTags,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProductPayload>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    category: '',
    tags: [],
    rating: 0,
    reviewCount: 0,
    stock: 0,
    isNew: false,
    isBest: false,
    brand: '',
    specifications: {},
    features: [],
    detailDescription: '',
    imageUrl: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 상품 데이터로 폼 초기화
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        tags: product.tags || [],
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        stock: product.stock || 0,
        isNew: product.isNew || false,
        isBest: product.isBest || false,
        brand: product.brand || '',
        specifications: product.specifications || {},
        features: product.features || [],
        detailDescription: product.detailDescription || '',
        imageUrl: product.imageUrl || '',
        images: product.images || [],
      });
    } else {
      // 새 상품 작성 시 폼 초기화
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: undefined,
        category: categories.filter((c) => c !== '전체')[0] || '',
        tags: [],
        rating: 0,
        reviewCount: 0,
        stock: 0,
        isNew: false,
        isBest: false,
        brand: '',
        specifications: {},
        features: [],
        detailDescription: '',
        imageUrl: '',
        images: [],
      });
    }
    setError(null);
  }, [product, categories, open]);

  const handleChange = (field: keyof ProductPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.name.trim()) {
      setError('상품명을 입력해주세요.');
      return;
    }
    if (!formData.description.trim()) {
      setError('상품 설명을 입력해주세요.');
      return;
    }
    if (!formData.category) {
      setError('카테고리를 선택해주세요.');
      return;
    }
    if (formData.price <= 0) {
      setError('가격을 입력해주세요.');
      return;
    }
    if (formData.stock !== undefined && formData.stock < 0) {
      setError('재고는 0 이상이어야 합니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(formData);
      onClose();
    } catch (err: any) {
      console.error('상품 저장 실패:', err);
      setError(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // '전체' 카테고리를 제외한 실제 카테고리 목록
  const validCategories = categories.filter((c) => c !== '전체');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product ? '상품 수정' : '새 상품 등록'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="상품명"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="상품명을 입력하세요"
          />

          <TextField
            label="상품 간단 설명"
            fullWidth
            required
            multiline
            rows={2}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="상품 목록에 표시될 간단한 설명을 입력하세요"
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="판매가"
                fullWidth
                required
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                placeholder="0"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="정가 (선택사항)"
                fullWidth
                type="number"
                value={formData.originalPrice || ''}
                onChange={(e) =>
                  handleChange('originalPrice', e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="정가를 입력하면 할인율이 표시됩니다"
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="재고"
                fullWidth
                required
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', Number(e.target.value))}
                placeholder="0"
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <TextField
            label="브랜드 (선택사항)"
            fullWidth
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="브랜드명"
          />

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
                helperText="예: 베스트, 할인, 신상"
              />
            )}
          />

          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={formData.features || []}
            onChange={(_, newValue) => handleChange('features', newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...rest } = getTagProps({ index });
                return <Chip key={key} label={option} {...rest} />;
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="주요 특징 (선택사항)"
                placeholder="특징을 입력하고 Enter를 누르세요"
                helperText="예: 방수 기능, 초경량, 내구성 우수"
              />
            )}
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              상세 설명
            </Typography>
            <RichTextEditor
              content={formData.detailDescription || ''}
              onChange={(content) => handleChange('detailDescription', content)}
              placeholder="상품의 상세한 설명을 입력하세요..."
            />
          </Box>

          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => handleChange('imageUrl', url)}
            label="상품 메인 이미지"
            helperText="클릭하거나 드래그하여 메인 이미지를 업로드하세요"
            maxSizeMB={5}
          />

          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isNew}
                  onChange={(e) => handleChange('isNew', e.target.checked)}
                />
              }
              label="신상품"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isBest}
                  onChange={(e) => handleChange('isBest', e.target.checked)}
                />
              }
              label="베스트 상품"
            />
          </Stack>
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

export default ProductDialog;
