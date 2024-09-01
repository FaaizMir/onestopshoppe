import React from 'react';

export default function ProductCard({ product, onViewProduct }) {
  return (
    <div className="border lg:ml-4 rounded-lg overflow-hidden shadow-md">
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="object-cover"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.productName}</h3>
        <p className="text-gray-600 mb-4">PKR {product.productPrice}</p>
       


        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => onViewProduct(product)}
        >
          View Product
        </button>
      </div>
    </div>
  );
}
