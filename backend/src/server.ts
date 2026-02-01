// 서버 시작 엔트리 포인트
import dotenv = require('dotenv');
import app = require('./app');

// Load environment variables
dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});

// 서버가 종료되지 않도록 에러 핸들링 추가
server.on('error', (error: NodeJS.ErrnoException) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

