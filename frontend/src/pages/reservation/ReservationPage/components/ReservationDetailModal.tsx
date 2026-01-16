import React, { useState, useEffect } from 'react';
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
import type { ReservationItem, ReservationStatus } from '../types';

interface ReservationDetailModalProps {
  open: boolean;
  reservation: ReservationItem | null;
  onClose: () => void;
  onSave: (updated: ReservationItem) => void;
}

export const ReservationDetailModal: React.FC<ReservationDetailModalProps> = ({
  open,
  reservation,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ReservationItem | null>(null);

  useEffect(() => {
    setFormData(reservation);
  }, [reservation]);

  if (!formData) return null;

  const handleChange = (field: keyof ReservationItem, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">예약 상세 정보</Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          예약번호: {formData.id}
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
            value={formData.memo || ''}
            onChange={(e) => handleChange('memo', e.target.value)}
            multiline
            rows={3}
            placeholder="예약 관련 메모를 입력하세요"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          취소
        </Button>
        <Button onClick={handleSave} variant="contained">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};
