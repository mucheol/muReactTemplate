/**
 * 파일 업로드 라우트
 * - 이미지 업로드 엔드포인트
 */

import express = require('express');
import multer = require('multer');
import path = require('path');
import fs = require('fs');

const router = express.Router();

// uploads 디렉토리 확인 및 생성
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer 스토리지 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 파일명: timestamp-랜덤문자열.확장자
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

// 파일 필터 (이미지만 허용)
const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('이미지 파일만 업로드할 수 있습니다.'));
  }
};

// Multer 인스턴스
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/**
 * POST /api/upload/image
 * 이미지 업로드
 */
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '파일이 업로드되지 않았습니다.',
      });
    }

    // 업로드된 파일의 URL 생성
    // 프론트엔드에서 접근할 수 있는 URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
    res.status(500).json({
      success: false,
      message: '이미지 업로드에 실패했습니다.',
    });
  }
});

/**
 * DELETE /api/upload/image/:filename
 * 업로드된 이미지 삭제
 */
router.delete('/image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);

    // 파일 존재 여부 확인
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: '파일을 찾을 수 없습니다.',
      });
    }

    // 파일 삭제
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: '파일이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('이미지 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: '이미지 삭제에 실패했습니다.',
    });
  }
});

export = router;
