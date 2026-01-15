import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FaqItem } from '../types';
import { CATEGORY_LABELS } from '../constants';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  if (faqs.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'grey.300',
          p: 3,
          textAlign: 'center',
          bgcolor: 'grey.50',
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          검색 결과가 없습니다.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          검색어를 바꾸거나, 다른 카테고리를 선택해 보세요.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {faqs.map((item) => (
        <Accordion
          key={item.id}
          disableGutters
          square={false}
          sx={{
            mb: 1,
            borderRadius: 2,
            '&:before': { display: 'none' },
            border: '1px solid',
            borderColor: 'grey.200',
            overflow: 'hidden',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: 'grey.50',
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
                gap: 1,
              },
            }}
          >
            <Chip
              label={CATEGORY_LABELS[item.category]}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 1, minWidth: '80px' }}
            />
            <Typography variant="subtitle2">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'white' }}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
