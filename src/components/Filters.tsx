import React from 'react';

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  categories: string[];
}

export default function Filters({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  minRating,
  setMinRating,
  categories,
}: FiltersProps) {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-24 px-2 py-1 border rounded"
            min={0}
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-24 px-2 py-1 border rounded"
            min={priceRange[0]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Minimum Rating</h3>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600">{minRating} stars and above</div>
      </div>
    </div>
  );
}