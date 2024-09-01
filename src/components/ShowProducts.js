import React, { useEffect, useState } from 'react';

export default function ShowProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch(`http://localhost:9000/myproducts?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDelete = (productId) => {
    fetch(`http://localhost:9000/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log the response message
        
        // Update the state or trigger a re-fetch of products to reflect the changes
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error(error);
        // Implement error handling as needed
      });
  };
  
  

  return (
    <div className="p-4 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-2xl text-center font-bold text-white mt-4 mb-4 lg:mt-8">Products Page</h2>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full">
          <div className="flex flex-row shadow-md rounded-t-lg p-2 bg-black text-white">
            <div className="w-1/5">
              <h3 className="text-lg font-semibold text-center">Image</h3>
            </div>
            <div className="w-1/5">
              <h3 className="text-lg font-semibold text-center">Name</h3>
            </div>
            <div className="w-1/5">
              <h3 className="text-lg font-semibold text-center">Category</h3>
            </div>
            <div className="w-1/5">
              <h3 className="text-lg font-semibold text-center">Price</h3>
            </div>
            <div className="w-1/5">
              <h3 className="text-lg font-semibold text-center">Description</h3>
            </div>
            <div className="w-1/5">
              <h3 className="text-lg font-semibold text-center">Delete Product</h3>
            </div>
          </div>
        </div>
        
        {products.map(product => (
          <div className="w-full" key={product.id}>
            <div className="flex flex-row bg-white shadow-md p-4">
              <div className="w-1/5 flex items-center justify-center">
                <img
                  src={`http://localhost:9000/uploads/${product.productImage}`}
                  alt={product.productName}
                  className="h-24 object-cover rounded"
                />
              </div>
              <div className="w-1/5 flex items-center justify-center">
                <p className="text-center">{product.productName}</p>
              </div>
              <div className="w-1/5 flex items-center justify-center">
                <p className="text-center">{product.productCategory}</p>
              </div>
              <div className="w-1/5 flex items-center justify-center">
                <p className="text-center">Price: PKR {product.productPrice}</p>
              </div>
              <div className="w-1/5 flex items-center justify-center">
                <p className="text-center">{product.productDescription}</p>
              </div>
              <div className="w-1/5 flex items-center justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="w-full h-1 bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
