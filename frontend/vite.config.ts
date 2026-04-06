import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: true, // 네트워크 노출 (0.0.0.0)
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // tiptap, recharts는 admin 전용 — 별도 청크로 분리 (lazy 로드)
          if (id.includes('@tiptap')) return 'vendor-tiptap';
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-')) return 'vendor-charts';
          // swiper — 홈 슬라이더 전용 청크
          if (id.includes('swiper')) return 'vendor-swiper';
          // MUI icons — 별도 분리 (사이즈 큼)
          if (id.includes('@mui/icons-material')) return 'vendor-mui-icons';
          // MUI core + emotion — 초기 번들에 포함 (모든 페이지 공통)
          if (id.includes('@mui/material') || id.includes('@emotion')) return 'vendor-mui';
          // React core — 초기 번들에 포함
          if (id.includes('node_modules/react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor-react';
        },
      },
    },
  },
})
