import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import type { ReservationItem, ReservationStatus } from '../types';

interface ReservationCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newReservation: ReservationItem) => void;
}

const generateReservationId = (date: string) => {
  const dateStr = date.replace(/-/g, '');
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `R-${dateStr}-${randomNum}`;
};

export const ReservationCreateModal: React.FC<ReservationCreateModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const today = dayjs().format('YYYY-MM-DD');

  const [formData, setFormData] = useState({
    customerName: '',
    date: today,
    time: '12:00',
    people: 2,
    status: 'pending' as ReservationStatus,
    memo: '',
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    const newReservation: ReservationItem = {
      id: generateReservationId(formData.date),
      customerName: formData.customerName,
      date: formData.date,
      time: formData.time,
      people: formData.people,
      status: formData.status,
      memo: formData.memo || undefined,
    };

    onCreate(newReservation);

    // 폼 초기화
    setFormData({
      customerName: '',
      date: today,
      time: '12:00',
      people: 2,
      status: 'pending',
      memo: '',
    });

    onClose();
  };

  const isFormValid = formData.customerName.trim() !== '' && formData.people > 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">새 예약 등록</Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          고객 예약 정보를 입력하세요
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            label="고객명"
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            fullWidth
            required
            placeholder="예: 홍길동"
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="예약 날짜"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="예약 시간"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          <TextField
            label="인원"
            type="number"
            value={formData.people}
            onChange={(e) => handleChange('people', Number(e.target.value))}
            inputProps={{ min: 1 }}
            required
          />

          <TextField
            select
            label="상태"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as ReservationStatus)}
            required
          >
            <MenuItem value="pending">대기</MenuItem>
            <MenuItem value="confirmed">확정</MenuItem>
            <MenuItem value="canceled">취소</MenuItem>
          </TextField>

          <TextField
            label="메모"
            value={formData.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            multiline
            rows={3}
            placeholder="예: 창가 자리 요청, 생일 케이크 준비 등"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          취소
        </Button>
        <Button onClick={handleCreate} variant="contained" disabled={!isFormValid}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
};
