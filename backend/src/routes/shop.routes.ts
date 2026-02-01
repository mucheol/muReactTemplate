/**
 * 쇼핑몰 상품 관련 API 라우트 (Prisma 연동)
 */

import express = require('express');
import prisma from '../lib/prisma';

const router = express.Router();

/**
 * JSON 문자열을 파싱하는 헬퍼 함수
 */
function parseJsonField<T>(jsonStr: string | null, defaultValue: T): T {
  if (!jsonStr) return defaultValue;
  try {
    return JSON.parse(jsonStr);
  } catch {
    return defaultValue;
  }
}

/**
 * 상품 데이터 변환
 */
function transformProduct(product: any) {
  return {
    ...product,
    tags: parseJsonField<string[]>(product.tags, []),
    specifications: parseJsonField<Record<string, string>>(product.specifications, {}),
    features: parseJsonField<string[]>(product.features, []),
  };
}

/**
 * GET /api/shop/products - 상품 목록 조회
 */
router.get('/products', async (req, res) => {
  try {
    const { category, sort, search } = req.query;

    let products = await prisma.product.findMany();

    // 카테고리 필터
    if (category && category !== '전체') {
      products = products.filter(p => p.category === category);
    }

    // 검색
    if (search) {
      const searchLower = (search as string).toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }

    // 정렬
    switch (sort) {
      case 'price_low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        products.sort((a, b) => b.id - a.id); // 최신순
    }

    const data = products.map(transformProduct);

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('상품 목록 조회 실패:', error);
    res.status(500).json({ success: false, message: '상품 목록 조회 실패' });
  }
});

/**
 * GET /api/shop/products/:id - 특정 상품 조회
 */
router.get('/products/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ success: false, message: '상품을 찾을 수 없습니다' });
    }

    res.json({ success: true, data: transformProduct(product) });
  } catch (error) {
    console.error('상품 조회 실패:', error);
    res.status(500).json({ success: false, message: '상품 조회 실패' });
  }
});

/**
 * POST /api/shop/products - 상품 생성
 */
router.post('/products', async (req, res) => {
  try {
    const {
      name, description, price, originalPrice, category, tags,
      rating, reviewCount, stock, isNew, isBest, brand,
      specifications, features, detailDescription
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        originalPrice,
        category,
        tags: JSON.stringify(tags || []),
        rating: rating || 0,
        reviewCount: reviewCount || 0,
        stock: stock || 0,
        isNew: isNew || false,
        isBest: isBest || false,
        brand,
        specifications: specifications ? JSON.stringify(specifications) : null,
        features: features ? JSON.stringify(features) : null,
        detailDescription,
      },
    });

    res.status(201).json({ success: true, data: transformProduct(product) });
  } catch (error) {
    console.error('상품 생성 실패:', error);
    res.status(500).json({ success: false, message: '상품 생성 실패' });
  }
});

/**
 * PUT /api/shop/products/:id - 상품 수정
 */
router.put('/products/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const {
      name, description, price, originalPrice, category, tags,
      rating, reviewCount, stock, isNew, isBest, brand,
      specifications, features, detailDescription
    } = req.body;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        originalPrice,
        category,
        tags: tags ? JSON.stringify(tags) : undefined,
        rating,
        reviewCount,
        stock,
        isNew,
        isBest,
        brand,
        specifications: specifications ? JSON.stringify(specifications) : undefined,
        features: features ? JSON.stringify(features) : undefined,
        detailDescription,
      },
    });

    res.json({ success: true, data: transformProduct(product) });
  } catch (error) {
    console.error('상품 수정 실패:', error);
    res.status(500).json({ success: false, message: '상품 수정 실패' });
  }
});

/**
 * DELETE /api/shop/products/:id - 상품 삭제
 */
router.delete('/products/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);
    await prisma.product.delete({ where: { id: productId } });
    res.json({ success: true, message: '상품이 삭제되었습니다' });
  } catch (error) {
    console.error('상품 삭제 실패:', error);
    res.status(500).json({ success: false, message: '상품 삭제 실패' });
  }
});

export = router;
