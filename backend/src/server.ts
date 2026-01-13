// 서버 시작 엔트리 포인트
import dotenv = require('dotenv');
import app = require('./app');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
