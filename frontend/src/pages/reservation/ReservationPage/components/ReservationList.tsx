import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Chip,
  Typography,
} from '@mui/material';
import type { ReservationItem } from '../types';
import { CARD_STYLE, STATUS_LABELS, STATUS_COLORS } from '../constants';

interface ReservationListProps {
  reservations: ReservationItem[];
  onRowClick?: (reservation: ReservationItem) => void;
}

export const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onRowClick,
}) => {
  return (
    <Card sx={CARD_STYLE}>
      <CardContent>
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            예약 목록
          </Typography>
          <Typography variant="caption" color="text.secondary">
            총 {reservations.length.toLocaleString()}건
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* ✅ 가로 스크롤 허용: 넓은 테이블 구조 */}
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead
              sx={{
                '& .MuiTableCell-root': {
                  bgcolor: 'grey.100',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                },
              }}
            >
              <TableRow>
                <TableCell>예약번호</TableCell>
                <TableCell>고객명</TableCell>
                <TableCell>일시</TableCell>
                <TableCell align="right">인원</TableCell>
                <TableCell>메모</TableCell>
                <TableCell align="right">상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((r) => (
                <TableRow
                  key={r.id}
                  hover
                  onClick={() => onRowClick?.(r)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{r.id}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{r.customerName}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {r.date} {r.time}
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    {r.people.toLocaleString()}명
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 260,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.memo || '-'}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={STATUS_LABELS[r.status]}
                      size="small"
                      color={STATUS_COLORS[r.status]}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}

              {reservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary">
                      조건에 맞는 예약이 없습니다.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};