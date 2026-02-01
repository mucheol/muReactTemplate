import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from '../../utils/api/apiClient';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  maxSizeMB?: number;
  accept?: string;
}

/**
 * 이미지 업로드 컴포넌트
 * - 파일 선택 및 미리보기
 * - 백엔드로 업로드
 * - 업로드된 이미지 URL 반환
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = '이미지 업로드',
  helperText = '클릭하여 이미지를 선택하거나 드래그하여 업로드하세요',
  maxSizeMB = 5,
  accept = 'image/*',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {

    // 파일 크기 검증
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`);
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // FormData 생성
      const formData = new FormData();
      formData.append('image', file);

      // 백엔드로 업로드
      const response = await apiClient.post<{ success: boolean; url: string }>(
        '/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        onChange(response.data.url);
      } else {
        throw new Error('업로드 실패');
      }
    } catch (err: any) {
      console.error('이미지 업로드 실패:', err);
      setError(err.response?.data?.message || '이미지 업로드에 실패했습니다.');
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await uploadFile(file);
  };

  const handleDelete = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {preview ? (
        <Stack spacing={1}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 400,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <img
              src={preview}
              alt="미리보기"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={handleDelete}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Button variant="outlined" onClick={handleClick} disabled={uploading}>
            이미지 변경
          </Button>
        </Stack>
      ) : (
        <Box
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            width: '100%',
            maxWidth: 400,
            height: 200,
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            bgcolor: isDragging ? 'action.hover' : 'background.paper',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: uploading ? 'divider' : 'primary.main',
              bgcolor: uploading ? 'background.paper' : 'action.hover',
            },
          }}
        >
          {uploading ? (
            <Stack alignItems="center" spacing={1}>
              <CircularProgress size={32} />
              <Typography variant="body2" color="text.secondary">
                업로드 중...
              </Typography>
            </Stack>
          ) : (
            <Stack alignItems="center" spacing={1}>
              <CloudUploadIcon
                sx={{
                  fontSize: 48,
                  color: isDragging ? 'primary.main' : 'text.secondary',
                  transition: 'color 0.2s'
                }}
              />
              <Typography
                variant="body2"
                color={isDragging ? 'primary.main' : 'text.secondary'}
                sx={{ transition: 'color 0.2s' }}
              >
                {isDragging ? '이미지를 여기에 놓으세요' : helperText}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (최대 {maxSizeMB}MB)
              </Typography>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
