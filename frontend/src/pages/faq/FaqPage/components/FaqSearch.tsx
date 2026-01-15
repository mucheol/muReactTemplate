import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const FaqSearch: React.FC<FaqSearchProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="키워드로 FAQ 검색 (예: 결제, 비밀번호, 접속 오류)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
