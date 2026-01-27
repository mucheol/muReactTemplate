import { Box, Pagination } from '@mui/material';
import { ProductCard } from './ProductCard';
import type { Product } from '../../../../../modules/shop';

interface ProductGridProps {
  products: Product[];
  wishlist: Set<number>;
  currentPage: number;
  totalPages: number;
  onProductClick: (productId: number) => void;
  onWishlistToggle: (productId: number) => void;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const ProductGrid = ({
  products,
  wishlist,
  currentPage,
  totalPages,
  onProductClick,
  onWishlistToggle,
  onPageChange,
}: ProductGridProps) => {
  return (
    <>
      {/* 상품 목록 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          mb: 4,
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.has(product.id)}
            onCardClick={onProductClick}
            onWishlistToggle={onWishlistToggle}
          />
        ))}
      </Box>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={totalPages} page={currentPage} onChange={onPageChange} color="primary" />
        </Box>
      )}
    </>
  );
};
