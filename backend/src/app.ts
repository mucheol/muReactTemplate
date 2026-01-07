// Express 앱 기본 설정 파일
import express = require('express');
import cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export = app;
