import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  maxWidth?: number | string;
  fullWidth?: boolean;
  sx?: object;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = '검색하세요',
  maxWidth = 500,
  fullWidth = true,
  sx = {},
}: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <TextField
        fullWidth={fullWidth}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: value && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={onClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ maxWidth }}
      />
    </Box>
  );
};
