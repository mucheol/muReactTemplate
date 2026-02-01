/**
 * 블로그 API 모듈
 */

import apiClient from '../../utils/api/apiClient';

/**
 * 블로그 포스트 인터페이스
 */
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  template: number; // 1, 2, 3
  date: string;
  views: number;
  thumbnail?: string;
  author?: string;
}

/**
 * API 응답 인터페이스
 */
export interface PostsResponse {
  success: boolean;
  count: number;
  data: BlogPost[];
}

export interface PostResponse {
  success: boolean;
  data: BlogPost;
}

export interface CategoriesResponse {
  success: boolean;
  data: string[];
}

export interface TagsResponse {
  success: boolean;
  data: string[];
}

/**
 * 포스트 목록 조회 파라미터
 */
export interface GetPostsParams {
  category?: string;
  tag?: string;
  search?: string;
}

/**
 * 포스트 생성/수정 페이로드
 */
export interface PostPayload {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  template?: number; // 1, 2, 3
  author?: string;
  thumbnail?: string;
}

/**
 * 블로그 API 객체
 */
export const blogApi = {
  /**
   * 포스트 목록 조회
   * GET /api/blog/posts
   */
  getPosts: async (params?: GetPostsParams): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>('/blog/posts', {
      params,
    });
    return response.data;
  },

  /**
   * 특정 포스트 조회
   * GET /api/blog/posts/:id
   */
  getPost: async (id: number): Promise<PostResponse> => {
    const response = await apiClient.get<PostResponse>(`/blog/posts/${id}`);
    return response.data;
  },

  /**
   * 카테고리 목록 조회
   * GET /api/blog/categories
   */
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await apiClient.get<CategoriesResponse>('/blog/categories');
    return response.data;
  },

  /**
   * 태그 목록 조회
   * GET /api/blog/tags
   */
  getTags: async (): Promise<TagsResponse> => {
    const response = await apiClient.get<TagsResponse>('/blog/tags');
    return response.data;
  },

  /**
   * 인기 포스트 조회
   * GET /api/blog/popular
   */
  getPopularPosts: async (): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>('/blog/popular');
    return response.data;
  },

  /**
   * 포스트 생성
   * POST /api/blog/posts
   */
  createPost: async (payload: PostPayload): Promise<PostResponse> => {
    const response = await apiClient.post<PostResponse>('/blog/posts', payload);
    return response.data;
  },

  /**
   * 포스트 수정
   * PUT /api/blog/posts/:id
   */
  updatePost: async (id: number, payload: Partial<PostPayload>): Promise<PostResponse> => {
    const response = await apiClient.put<PostResponse>(`/blog/posts/${id}`, payload);
    return response.data;
  },

  /**
   * 포스트 삭제
   * DELETE /api/blog/posts/:id
   */
  deletePost: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/blog/posts/${id}`);
    return response.data;
  },
};

export default blogApi;
