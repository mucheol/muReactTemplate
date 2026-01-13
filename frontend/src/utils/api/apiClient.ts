import axios from 'axios';
//. 프론트: 공통 API 클라이언트 + auth 모듈
// 공통 API 클라이언트 (axios 등으로 확장 예정)
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
