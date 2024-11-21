import React from 'react';

interface SortOptionsProps {
  sortBy: string;
  setSortBy: (option: string) => void;
}

export default function SortOptions({ sortBy, setSortBy }: SortOptionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Name</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}