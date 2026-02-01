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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { faqApi, type FaqItem } from '../../../modules/faq';
import { CATEGORY_LABELS } from '../../user/faq/FaqPage/constants';

/**
 * FAQ 관리 페이지
 * - FAQ 목록 조회 및 관리
 */
const FaqManagementPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await faqApi.getItems();
      setFaqs(response.data);
    } catch (err) {
      console.error('FAQ 목록 조회 실패:', err);
      setError('FAQ 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleEdit = (id: number) => {
    console.log('편집:', id);
    // TODO: 편집 다이얼로그 또는 페이지 이동
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await faqApi.deleteItem(id);
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    } catch (err) {
      console.error('FAQ 삭제 실패:', err);
      alert('FAQ 삭제에 실패했습니다.');
    }
  };

  const handleAddNew = () => {
    console.log('FAQ 추가');
    // TODO: 작성 다이얼로그 또는 페이지 이동
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          FAQ 관리
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
          FAQ 추가
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          {/* FAQ 목록 테이블 */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>질문</TableCell>
                  <TableCell>답변 미리보기</TableCell>
                  <TableCell>태그</TableCell>
                  <TableCell align="center">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faqs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="text.secondary" sx={{ py: 4 }}>
                        등록된 FAQ가 없습니다.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  faqs.map((faq) => (
                    <TableRow key={faq.id} hover>
                      <TableCell>{faq.id}</TableCell>
                      <TableCell>
                        <Chip
                          label={CATEGORY_LABELS[faq.category] || faq.category}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {faq.question}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {faq.answer.slice(0, 50)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {faq.tags && faq.tags.length > 0 ? (
                          <Stack direction="row" spacing={0.5} flexWrap="wrap">
                            {faq.tags.slice(0, 2).map((tag) => (
                              <Chip key={tag} label={tag} size="small" sx={{ mb: 0.5 }} />
                            ))}
                            {faq.tags.length > 2 && (
                              <Chip label={`+${faq.tags.length - 2}`} size="small" />
                            )}
                          </Stack>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton size="small" onClick={() => handleEdit(faq.id)} title="편집">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(faq.id)}
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

export default FaqManagementPage;
