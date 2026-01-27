import { FormControl, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

interface SortOption<T = string> {
  readonly value: T;
  readonly label: string;
}

interface SortSelectProps<T = string> {
  value: T;
  options: readonly SortOption<T>[];
  onChange: (value: T) => void;
  minWidth?: number | string;
  size?: 'small' | 'medium';
}

export const SortSelect = <T extends string = string>({
  value,
  options,
  onChange,
  minWidth = 120,
  size = 'small',
}: SortSelectProps<T>) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as T);
  };

  return (
    <FormControl size={size} sx={{ minWidth }}>
      <Select value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
