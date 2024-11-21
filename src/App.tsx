import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import SortOptions from './components/SortOptions';
import { products } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  
  const productsPerPage = 6;

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.rating >= minRating &&
      (selectedCategory ? product.category === selectedCategory : true)
    );

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, priceRange, selectedCategory, minRating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Product Catalog</h1>
        
        <div className="mb-8">
          <SearchBar products={products} onSearch={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minRating={minRating}
              setMinRating={setMinRating}
              categories={categories}
            />
          </div>

          <div className="md:col-span-3">
            <div className="mb-4">
              <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            <ProductGrid
              products={filteredProducts}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;