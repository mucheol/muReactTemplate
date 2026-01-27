//백엔드: 인증 API 추가
// Express 앱 기본 설정 파일
import dotenv = require('dotenv');
import express = require('express');
import cors = require('cors');
import routes = require('./routes');

// 환경 변수 로드 (app.ts에서도 필요)
dotenv.config();

const app = express();

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
console.log('[CORS] Environment CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('[CORS] Using origin:', corsOrigin);
console.log('[CORS] Is wildcard:', corsOrigin === '*');

const corsOptions = {
  origin: corsOrigin === '*' ? true : corsOrigin,  // '*'이면 모든 origin 허용
  credentials: true,
};
console.log('[CORS] Final options:', JSON.stringify(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', routes);

export = app;
