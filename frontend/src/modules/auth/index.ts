// 인증 관련 모듈 진입점 (hooks, services, types 등을 여기서 export)
import { apiClient } from '../../utils/api/apiClient';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export const authApi = {
  login(payload: LoginPayload) {
    return apiClient.post('/auth/login', payload);
  },
  register(payload: RegisterPayload) {
    return apiClient.post('/auth/register', payload);
  },
};
