import React from 'react';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import type { FaqCategory } from './types';
import { CARD_STYLE } from './constants';
import { useFaqFilter } from './hooks/useFaqFilter';
import { FaqSearch } from './components/FaqSearch';
import { FaqTabs } from './components/FaqTabs';
import { FaqAccordion } from './components/FaqAccordion';
import { FaqContactInfo } from './components/FaqContactInfo';

const FaqPage: React.FC = () => {
  const { category, setCategory, search, setSearch, filteredFaqs, faqsByCategory } =
    useFaqFilter();

  const handleChangeCategory = (_: React.SyntheticEvent, value: FaqCategory) => {
    setCategory(value);
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* 헤더 영역 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1 }}>
            HELP CENTER
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
            자주 묻는 질문(FAQ)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            궁금하신 내용을 검색하거나 카테고리별로 찾아보세요. 그래도 해결이 안 되면 페이지 하단의
            문의 채널을 이용해 주세요.
          </Typography>
        </Box>

        {/* 검색 + 카테고리 탭 */}
        <Paper elevation={0} sx={{ mb: 3, ...CARD_STYLE }}>
          <FaqSearch value={search} onChange={setSearch} />
          <Divider />
          <FaqTabs
            category={category}
            onCategoryChange={handleChangeCategory}
            categoryCounts={faqsByCategory}
          />
        </Paper>

        {/* FAQ 리스트 (아코디언) */}
        <Box sx={{ mb: 4 }}>
          <FaqAccordion faqs={filteredFaqs} />
        </Box>

        {/* 추가 정보 섹션 */}
        <FaqContactInfo />
      </Container>
    </Box>
  );
};

export default FaqPage;
