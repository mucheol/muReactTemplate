import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
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
  Rating,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { shopApi, type Product } from '../../../modules/shop';

/**
 * 쇼핑몰 관리 페이지
 * - 상품 목록 조회 및 관리
 */
const ShopManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await shopApi.getProducts();
        setProducts(response.data);
      } catch (err) {
        console.error('상품 조회 실패:', err);
        setError('상품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id: number) => {
    console.log('편집:', id);
    // TODO: 편집 다이얼로그 또는 페이지 이동
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await shopApi.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error('상품 삭제 실패:', err);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  const handleView = (id: number) => {
    window.open(`/shop/${id}`, '_blank');
  };

  const handleAddNew = () => {
    console.log('상품 추가');
    // TODO: 작성 다이얼로그 또는 페이지 이동
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
          쇼핑몰 관리
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
          상품 추가
        </Button>
      </Stack>

      <Card>
        <CardContent>
          {/* 상품 목록 테이블 */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>상품명</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>가격</TableCell>
                  <TableCell>재고</TableCell>
                  <TableCell>평점</TableCell>
                  <TableCell>리뷰수</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell align="center">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography color="text.secondary" sx={{ py: 4 }}>
                        등록된 상품이 없습니다.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.description.slice(0, 30)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={product.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {product.price.toLocaleString()}원
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through' }}
                          >
                            {product.originalPrice.toLocaleString()}원
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${product.stock}개`}
                          size="small"
                          color={product.stock < 10 ? 'error' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Rating value={product.rating} readOnly size="small" precision={0.1} />
                          <Typography variant="caption">({product.rating})</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{product.reviewCount}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {product.isNew && <Chip label="NEW" size="small" color="primary" />}
                          {product.isBest && <Chip label="BEST" size="small" color="success" />}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton size="small" onClick={() => handleView(product.id)} title="미리보기">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleEdit(product.id)} title="편집">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(product.id)}
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
    </Box>
  );
};

export default ShopManagementPage;
