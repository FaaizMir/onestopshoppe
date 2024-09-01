import React, { useState, useEffect } from 'react';

const ProductList = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductClick = (imageUrl, productCategory) => {
    // Check the productCategory and update the appropriate state
    if (productCategory === 'shirt') {
      onProductClick('selectedShirtImage', imageUrl);
    } else if (productCategory === 'pants') {
      onProductClick('selectedPantsImage', imageUrl);
    }
  };

  return (
    <div className="container bg-gray-300 mx-auto p-8">
    <div className="flex">
      <div className="w-full h-screen  overflow-y-auto p-4">
        <h1 className="text-2xl text-white font-bold mb-4">Products</h1>
        {products.length > 0 ? (
          <div className="flex flex-col items-start gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="border rounded-md cursor-pointer hover:bg-gray-100 w-full max-w-xs"
                onClick={() => handleProductClick(product.imageUrl, product.productCategory)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md "
                />
                <div className="mt-4">
                  <p className="text-xl font-semibold">{product.productName}</p>
                  <p className="text-gray-600">PKR {product.productPrice}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </div>
        {/* Add the rest of your content here */}
        <div className="flex-1">
          {/* Add your main content here */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
