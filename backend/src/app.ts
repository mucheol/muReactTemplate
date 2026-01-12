//백엔드: 인증 API 추가
// Express 앱 기본 설정 파일
import express = require('express');
import cors = require('cors');
import routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', routes);

export = app;
