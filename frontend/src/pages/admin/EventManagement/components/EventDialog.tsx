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
  Grid,
  Typography,
  IconButton,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type {
  EventItem,
  EventPayload,
  EventCategory,
  PrizeItem,
  QuizQuestion,
  StampLocation,
  TimeSaleProduct,
} from '../../../../modules/event';
import dayjs from 'dayjs';
import RichTextEditor from '../../../../components/editor/RichTextEditor';
import ImageUpload from '../../../../components/upload/ImageUpload';

const EVENT_CATEGORY_OPTIONS: { value: EventCategory; label: string }[] = [
  { value: 'discount', label: '할인' },
  { value: 'coupon', label: '쿠폰' },
  { value: 'prize', label: '경품' },
  { value: 'promotion', label: '기획전' },
  { value: 'attendance', label: '출석체크' },
  { value: 'timesale', label: '타임세일' },
  { value: 'quiz', label: '퀴즈' },
  { value: 'stamp', label: '스탬프' },
];

interface EventDialogProps {
  open: boolean;
  event: EventItem | null;
  onClose: () => void;
  onSave: (payload: EventPayload) => Promise<void>;
}

/**
 * 이벤트 생성/수정 다이얼로그
 */
const EventDialog: React.FC<EventDialogProps> = ({ open, event, onClose, onSave }) => {
  const [formData, setFormData] = useState<EventPayload>({
    title: '',
    subtitle: '',
    thumbnailUrl: '',
    category: 'discount',
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    content: '',
    howToParticipate: [],
    benefits: [],
    notes: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 이벤트 데이터로 폼 초기화
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        subtitle: event.subtitle || '',
        thumbnailUrl: event.thumbnailUrl || '',
        category: event.category,
        startDate: dayjs(event.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(event.endDate).format('YYYY-MM-DD'),
        content: event.content || '',
        howToParticipate: event.howToParticipate || [],
        benefits: event.benefits || [],
        notes: event.notes || [],
        prizeItems: event.prizeItems || undefined,
        prizeType: event.prizeType || undefined,
        quizQuestions: event.quizQuestions || undefined,
        stampLocations: event.stampLocations || undefined,
        timeSaleProducts: event.timeSaleProducts || undefined,
        timeSaleEndTime: event.timeSaleEndTime || undefined,
      });
    } else {
      // 새 이벤트 작성 시 폼 초기화
      setFormData({
        title: '',
        subtitle: '',
        thumbnailUrl: '',
        category: 'discount',
        startDate: dayjs().format('YYYY-MM-DD'),
        endDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
        content: '',
        howToParticipate: [],
        benefits: [],
        notes: [],
      });
    }
    setError(null);
  }, [event, open]);

  const handleChange = (field: keyof EventPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!formData.category) {
      setError('카테고리를 선택해주세요.');
      return;
    }
    if (!formData.startDate) {
      setError('시작일을 입력해주세요.');
      return;
    }
    if (!formData.endDate) {
      setError('종료일을 입력해주세요.');
      return;
    }

    // 날짜 유효성 검사
    const start = dayjs(formData.startDate);
    const end = dayjs(formData.endDate);
    if (end.isBefore(start)) {
      setError('종료일은 시작일보다 늦어야 합니다.');
      return;
    }

    // 경품 이벤트 유효성 검사
    if (formData.category === 'prize') {
      if (!formData.prizeType) {
        setError('경품 추첨 방식을 선택해주세요.');
        return;
      }
      if (!formData.prizeItems || formData.prizeItems.length === 0) {
        setError('최소 1개 이상의 경품을 추가해주세요.');
        return;
      }
    }

    // 퀴즈 이벤트 유효성 검사
    if (formData.category === 'quiz') {
      if (!formData.quizQuestions || formData.quizQuestions.length === 0) {
        setError('최소 1개 이상의 퀴즈를 추가해주세요.');
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(formData);
      onClose();
    } catch (err: any) {
      console.error('이벤트 저장 실패:', err);
      setError(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 경품 아이템 추가/수정/삭제
  const handleAddPrizeItem = () => {
    const newItem: PrizeItem = {
      id: Date.now(),
      name: '',
      probability: 10,
      color: '#FF6B6B',
    };
    setFormData((prev) => ({
      ...prev,
      prizeItems: [...(prev.prizeItems || []), newItem],
    }));
  };

  const handleUpdatePrizeItem = (index: number, field: keyof PrizeItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      prizeItems: prev.prizeItems?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleDeletePrizeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prizeItems: prev.prizeItems?.filter((_, i) => i !== index),
    }));
  };

  // 퀴즈 추가/수정/삭제
  const handleAddQuiz = () => {
    const newQuiz: QuizQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setFormData((prev) => ({
      ...prev,
      quizQuestions: [...(prev.quizQuestions || []), newQuiz],
    }));
  };

  const handleUpdateQuiz = (index: number, field: keyof QuizQuestion, value: any) => {
    setFormData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleDeleteQuiz = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions?.filter((_, i) => i !== index),
    }));
  };

  // 스탬프 위치 추가/수정/삭제
  const handleAddStampLocation = () => {
    const newLocation: StampLocation = {
      id: `stamp-${Date.now()}`,
      title: '',
      description: '',
      path: '/',
    };
    setFormData((prev) => ({
      ...prev,
      stampLocations: [...(prev.stampLocations || []), newLocation],
    }));
  };

  const handleUpdateStampLocation = (index: number, field: keyof StampLocation, value: any) => {
    setFormData((prev) => ({
      ...prev,
      stampLocations: prev.stampLocations?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleDeleteStampLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stampLocations: prev.stampLocations?.filter((_, i) => i !== index),
    }));
  };

  // 타임세일 상품 추가/수정/삭제
  const handleAddTimeSaleProduct = () => {
    const newProduct: TimeSaleProduct = {
      id: Date.now(),
      name: '',
      brand: '',
      price: 0,
      originalPrice: 0,
      stock: 0,
      maxStock: 100,
    };
    setFormData((prev) => ({
      ...prev,
      timeSaleProducts: [...(prev.timeSaleProducts || []), newProduct],
    }));
  };

  const handleUpdateTimeSaleProduct = (
    index: number,
    field: keyof TimeSaleProduct,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      timeSaleProducts: prev.timeSaleProducts?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleDeleteTimeSaleProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSaleProducts: prev.timeSaleProducts?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{event ? '이벤트 수정' : '새 이벤트 등록'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          {/* 기본 정보 */}
          <Box>
            <Typography variant="h6" gutterBottom>
              기본 정보
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="제목"
                fullWidth
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="이벤트 제목을 입력하세요"
              />

              <TextField
                label="부제목 (선택사항)"
                fullWidth
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="이벤트 부제목을 입력하세요"
              />

              <FormControl fullWidth required>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={formData.category}
                  label="카테고리"
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {EVENT_CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <ImageUpload
                value={formData.thumbnailUrl}
                onChange={(url) => handleChange('thumbnailUrl', url)}
                label="이벤트 썸네일 이미지"
                helperText="클릭하거나 드래그하여 썸네일 이미지를 업로드하세요"
                maxSizeMB={5}
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="시작일"
                    fullWidth
                    required
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="종료일"
                    fullWidth
                    required
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  이벤트 내용
                </Typography>
                <RichTextEditor
                  content={formData.content || ''}
                  onChange={(content) => handleChange('content', content)}
                  placeholder="이벤트 상세 내용을 입력하세요..."
                />
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* 경품 이벤트 전용 필드 */}
          {formData.category === 'prize' && (
            <Box>
              <Typography variant="h6" gutterBottom>
                경품 추첨 설정
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel>추첨 방식</InputLabel>
                  <Select
                    value={formData.prizeType || ''}
                    label="추첨 방식"
                    onChange={(e) => handleChange('prizeType', e.target.value)}
                  >
                    <MenuItem value="wheel">룰렛 (돌림판)</MenuItem>
                    <MenuItem value="ladder">사다리 타기</MenuItem>
                  </Select>
                </FormControl>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2">경품 목록</Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={handleAddPrizeItem}>
                      경품 추가
                    </Button>
                  </Stack>

                  {formData.prizeItems?.map((item, index) => (
                    <Paper key={item.id} sx={{ p: 2, mb: 2 }} variant="outlined">
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <TextField
                            label="경품명"
                            fullWidth
                            required
                            value={item.name}
                            onChange={(e) => handleUpdatePrizeItem(index, 'name', e.target.value)}
                            placeholder="예: 10% 할인쿠폰"
                          />
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeletePrizeItem(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="당첨 확률 (%)"
                              type="number"
                              fullWidth
                              value={item.probability}
                              onChange={(e) =>
                                handleUpdatePrizeItem(index, 'probability', Number(e.target.value))
                              }
                              inputProps={{ min: 0, max: 100 }}
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="색상"
                              type="color"
                              fullWidth
                              value={item.color}
                              onChange={(e) => handleUpdatePrizeItem(index, 'color', e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Stack>
                    </Paper>
                  ))}
                </Box>
              </Stack>
            </Box>
          )}

          {/* 퀴즈 이벤트 전용 필드 */}
          {formData.category === 'quiz' && (
            <Box>
              <Typography variant="h6" gutterBottom>
                퀴즈 설정
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2">퀴즈 목록</Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={handleAddQuiz}>
                  퀴즈 추가
                </Button>
              </Stack>

              {formData.quizQuestions?.map((quiz, index) => (
                <Paper key={quiz.id} sx={{ p: 2, mb: 2 }} variant="outlined">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TextField
                        label={`퀴즈 ${index + 1} - 질문`}
                        fullWidth
                        required
                        value={quiz.question}
                        onChange={(e) => handleUpdateQuiz(index, 'question', e.target.value)}
                        placeholder="예: 우리 쇼핑몰의 이름은?"
                      />
                      <IconButton color="error" size="small" onClick={() => handleDeleteQuiz(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                    {quiz.options.map((option, optIndex) => (
                      <TextField
                        key={optIndex}
                        label={`보기 ${optIndex + 1}`}
                        fullWidth
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...quiz.options];
                          newOptions[optIndex] = e.target.value;
                          handleUpdateQuiz(index, 'options', newOptions);
                        }}
                        placeholder={`보기 ${optIndex + 1}`}
                      />
                    ))}
                    <FormControl fullWidth>
                      <InputLabel>정답</InputLabel>
                      <Select
                        value={quiz.correctAnswer}
                        label="정답"
                        onChange={(e) =>
                          handleUpdateQuiz(index, 'correctAnswer', Number(e.target.value))
                        }
                      >
                        {quiz.options.map((_, optIndex) => (
                          <MenuItem key={optIndex} value={optIndex}>
                            보기 {optIndex + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Paper>
              ))}
            </Box>
          )}

          {/* 스탬프 투어 전용 필드 */}
          {formData.category === 'stamp' && (
            <Box>
              <Typography variant="h6" gutterBottom>
                스탬프 투어 설정
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2">스탬프 위치</Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={handleAddStampLocation}>
                  위치 추가
                </Button>
              </Stack>

              {formData.stampLocations?.map((location, index) => (
                <Paper key={location.id} sx={{ p: 2, mb: 2 }} variant="outlined">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TextField
                        label="제목"
                        fullWidth
                        required
                        value={location.title}
                        onChange={(e) => handleUpdateStampLocation(index, 'title', e.target.value)}
                        placeholder="예: 홈페이지 방문"
                      />
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteStampLocation(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                    <TextField
                      label="설명"
                      fullWidth
                      value={location.description}
                      onChange={(e) =>
                        handleUpdateStampLocation(index, 'description', e.target.value)
                      }
                      placeholder="예: 메인 페이지 방문하기"
                    />
                    <TextField
                      label="경로 (URL)"
                      fullWidth
                      value={location.path}
                      onChange={(e) => handleUpdateStampLocation(index, 'path', e.target.value)}
                      placeholder="예: /"
                    />
                  </Stack>
                </Paper>
              ))}
            </Box>
          )}

          {/* 타임세일 전용 필드 */}
          {formData.category === 'timesale' && (
            <Box>
              <Typography variant="h6" gutterBottom>
                타임세일 설정
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="세일 종료 시각"
                  type="datetime-local"
                  fullWidth
                  value={formData.timeSaleEndTime || ''}
                  onChange={(e) => handleChange('timeSaleEndTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2">세일 상품</Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={handleAddTimeSaleProduct}>
                      상품 추가
                    </Button>
                  </Stack>

                  {formData.timeSaleProducts?.map((product, index) => (
                    <Paper key={product.id} sx={{ p: 2, mb: 2 }} variant="outlined">
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <TextField
                            label="상품명"
                            fullWidth
                            required
                            value={product.name}
                            onChange={(e) =>
                              handleUpdateTimeSaleProduct(index, 'name', e.target.value)
                            }
                          />
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteTimeSaleProduct(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="브랜드"
                              fullWidth
                              value={product.brand}
                              onChange={(e) =>
                                handleUpdateTimeSaleProduct(index, 'brand', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="세일가"
                              type="number"
                              fullWidth
                              value={product.price}
                              onChange={(e) =>
                                handleUpdateTimeSaleProduct(index, 'price', Number(e.target.value))
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="정가"
                              type="number"
                              fullWidth
                              value={product.originalPrice}
                              onChange={(e) =>
                                handleUpdateTimeSaleProduct(
                                  index,
                                  'originalPrice',
                                  Number(e.target.value),
                                )
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="재고"
                              type="number"
                              fullWidth
                              value={product.stock}
                              onChange={(e) =>
                                handleUpdateTimeSaleProduct(index, 'stock', Number(e.target.value))
                              }
                            />
                          </Grid>
                        </Grid>
                      </Stack>
                    </Paper>
                  ))}
                </Box>
              </Stack>
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

export default EventDialog;
