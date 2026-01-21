import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { TemplateNumber } from '../../../types/template.types';

/**
 * 쇼핑몰 관리 페이지
 * - 템플릿 1, 2, 3 탭으로 구분
 * - 각 템플릿별 상품 관리
 */
const ShopManagementPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateNumber>(1);

  const handleTemplateChange = (_event: React.SyntheticEvent, newValue: TemplateNumber) => {
    setSelectedTemplate(newValue);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          쇼핑몰 관리
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          상품 추가
        </Button>
      </Stack>

      <Card>
        <CardContent>
          {/* 템플릿 선택 탭 */}
          <Tabs value={selectedTemplate} onChange={handleTemplateChange} sx={{ mb: 3 }}>
            <Tab label="템플릿 1" value={1} />
            <Tab label="템플릿 2" value={2} />
            <Tab label="템플릿 3" value={3} />
          </Tabs>

          {/* 템플릿별 컨텐츠 영역 */}
          <Box>
            <Typography variant="body1" color="text.secondary">
              템플릿 {selectedTemplate}의 쇼핑몰 상품 관리 영역입니다.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              TODO: 상품 목록, 편집, 삭제 기능 구현 예정
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShopManagementPage;
