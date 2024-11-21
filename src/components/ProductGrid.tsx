import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  productsPerPage: number;
}

export default function ProductGrid({ products, currentPage, productsPerPage }: ProductGridProps) {
  const startIndex = (currentPage - 1) * productsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {selectedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}