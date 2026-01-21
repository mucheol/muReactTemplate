import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface TemplateSelectorProps {
  selectedTemplate: 1 | 2;
  onTemplateChange: (template: 1 | 2) => void;
}

/**
 * 템플릿 선택 버튼 그룹
 */
export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <ButtonGroup variant="outlined" size="small">
      <Button
        variant={selectedTemplate === 1 ? 'contained' : 'outlined'}
        onClick={() => onTemplateChange(1)}
      >
        1
      </Button>
      <Button
        variant={selectedTemplate === 2 ? 'contained' : 'outlined'}
        onClick={() => onTemplateChange(2)}
      >
        2
      </Button>
    </ButtonGroup>
  );
};
