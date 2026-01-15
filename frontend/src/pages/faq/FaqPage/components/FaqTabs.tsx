import React from 'react';
import { Tabs, Tab, Box, Chip } from '@mui/material';
import type { FaqCategory } from '../types';
import { CATEGORY_LABELS } from '../constants';

interface FaqTabsProps {
  category: FaqCategory;
  onCategoryChange: (_: React.SyntheticEvent, value: FaqCategory) => void;
  categoryCounts: Record<FaqCategory, number>;
}

export const FaqTabs: React.FC<FaqTabsProps> = ({
  category,
  onCategoryChange,
  categoryCounts,
}) => {
  return (
    <Tabs
      value={category}
      onChange={onCategoryChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        px: 2,
        '& .MuiTab-root': { textTransform: 'none', fontSize: 14, minHeight: 44 },
      }}
    >
      {(Object.keys(CATEGORY_LABELS) as FaqCategory[]).map((key) => (
        <Tab
          key={key}
          value={key}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{CATEGORY_LABELS[key]}</span>
              <Chip
                label={categoryCounts[key]}
                size="small"
                color={key === category ? 'primary' : 'default'}
                sx={{ height: 20, fontSize: 12 }}
              />
            </Box>
          }
        />
      ))}
    </Tabs>
  );
};
