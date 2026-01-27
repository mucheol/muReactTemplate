import { Box, Chip } from '@mui/material';

interface TagCloudProps {
  tags: string[];
  selectedTag?: string;
  onTagClick: (tag: string) => void;
  size?: 'small' | 'medium';
}

/**
 * 태그 클라우드 컴포넌트 (범용)
 *
 * 클릭 가능한 태그들을 표시합니다.
 */
export const TagCloud = ({ tags, selectedTag, onTagClick, size = 'small' }: TagCloudProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size={size}
          variant={selectedTag === tag ? 'filled' : 'outlined'}
          color={selectedTag === tag ? 'primary' : 'default'}
          onClick={() => onTagClick(tag)}
          sx={{ cursor: 'pointer' }}
        />
      ))}
    </Box>
  );
};
