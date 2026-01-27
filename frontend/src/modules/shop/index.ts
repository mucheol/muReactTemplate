/**
 * 쇼핑몰 API 모듈
 *
 * 이 파일은 쇼핑몰 관련 API 호출 함수들을 모아놓은 곳입니다.
 * 백엔드 API와 통신하는 모든 함수를 여기에 정의합니다.
 */

import apiClient from '../../utils/api/apiClient';

/**
 * 상품 인터페이스 (타입 정의)
 *
 * 백엔드에서 받아오는 상품 데이터의 구조를 정의합니다.
 * 이 타입을 사용하면 TypeScript가 자동완성과 타입 체크를 해줍니다.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;  // ? 는 선택 사항 (없을 수도 있음)
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isBest: boolean;
}

/**
 * API 응답 인터페이스
 *
 * 백엔드에서 보내주는 응답의 구조를 정의합니다.
 * - success: 성공 여부 (true/false)
 * - count: 상품 개수
 * - data: 상품 배열
 */
export interface ProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

/**
 * 단일 상품 응답 인터페이스
 */
export interface ProductResponse {
  success: boolean;
  data: Product;
}

/**
 * 상품 목록 조회 파라미터
 *
 * API 호출 시 전달할 수 있는 옵션들입니다.
 * 모두 선택 사항(optional)입니다.
 */
export interface GetProductsParams {
  category?: string;    // 카테고리 필터 (예: "의류")
  sort?: string;        // 정렬 방식 (예: "price_low", "popular")
  search?: string;      // 검색어
}

/**
 * 쇼핑몰 API 객체
 *
 * 모든 쇼핑몰 관련 API 호출 함수를 하나의 객체로 묶어놓았습니다.
 * 사용 예: shopApi.getProducts({ category: '의류' })
 */
export const shopApi = {
  /**
   * 상품 목록 조회
   *
   * GET /api/shop/products
   *
   * @param params - 필터, 정렬, 검색 옵션 (선택 사항)
   * @returns Promise<ProductsResponse> - 상품 목록이 담긴 응답
   *
   * 사용 예:
   * const response = await shopApi.getProducts({ category: '의류', sort: 'price_low' });
   * console.log(response.data); // 상품 배열
   */
  getProducts: async (params?: GetProductsParams): Promise<ProductsResponse> => {
    /**
     * apiClient.get()은 axios를 사용한 GET 요청입니다.
     *
     * - 첫 번째 인자: API 경로 ('/shop/products')
     * - 두 번째 인자: { params } - 쿼리 파라미터로 전달됨
     *
     * 예: params = { category: '의류', sort: 'price_low' }
     * → 실제 요청: GET /api/shop/products?category=의류&sort=price_low
     */
    const response = await apiClient.get<ProductsResponse>('/shop/products', {
      params,  // params가 있으면 쿼리 파라미터로 전달, 없으면 생략
    });

    /**
     * response.data는 백엔드에서 보낸 응답 본문입니다.
     * {
     *   success: true,
     *   count: 20,
     *   data: [...상품 배열]
     * }
     */
    return response.data;
  },

  /**
   * 특정 상품 상세 조회
   *
   * GET /api/shop/products/:id
   *
   * @param id - 조회할 상품의 ID
   * @returns Promise<ProductResponse> - 상품 정보가 담긴 응답
   *
   * 사용 예:
   * const response = await shopApi.getProduct(5);
   * console.log(response.data); // 상품 객체
   */
  getProduct: async (id: number): Promise<ProductResponse> => {
    /**
     * 템플릿 리터럴을 사용하여 URL에 id를 삽입합니다.
     * 예: id = 5 → GET /shop/products/5
     */
    const response = await apiClient.get<ProductResponse>(`/shop/products/${id}`);
    return response.data;
  },
};

/**
 * 기본 export
 *
 * 다른 파일에서 이렇게 사용할 수 있습니다:
 * import { shopApi, Product } from '@/modules/shop';
 */
export default shopApi;
