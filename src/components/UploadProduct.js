import React, { useState } from 'react';

export default function UploadProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productDescription: '',
    productPrice: '',
    productImage: null
  });

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, productImage: file });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a new FormData object
    const payload = new FormData();
    payload.append('userId', localStorage.getItem('userId'));
    payload.append('productName', formData.productName);
    payload.append('productCategory', formData.productCategory);
    payload.append('productDescription', formData.productDescription);
    payload.append('productPrice', formData.productPrice);
    payload.append('productImage', formData.productImage);

    // Send the payload to the API
    fetch('http://localhost:9000/product', {
      method: 'POST',
      body: payload
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        console.log(data);
        // Show the success modal
        setSuccessModalOpen(true);
        window.location.href = '/seller'

        setFormData({
          productName: '',
          productCategory: '',
          productDescription: '',
          productPrice: '',
          productImage: null,
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }

  // Function to close the success modal
  function handleCloseSuccessModal() {
    setSuccessModalOpen(false);
  }
  return (
    <div className="bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 w-full h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto">
        <form className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              className="bg-white dark:bg-gray-900 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-white"
              id="name"
              name="productName"
              type="text"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="category">
              Product Category
            </label>
            <select
              className="text-white bg-white dark:bg-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select a category</option>
              <option value="shirt">Shirt</option>
              <option value="pants">Pants</option>
              {/* <option value="home">Home</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Product Description
            </label>
            <textarea
              className="bg-white dark:bg-gray-900 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="productDescription"
              rows="4"
              placeholder="Enter product description"
              value={formData.productDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="bg-white text-white dark:bg-gray-900 shadow appearance-none border rounded w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline"
              id="price"
              name="productPrice"
              type="number"
              step="0.01"
              placeholder="Enter product price"
              value={formData.productPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              className="bg-white text-white dark:bg-gray-900 appearance-none block w-full border border-gray-400 hover:border-gray-500 px-3 py-2 rounded leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register Product
            </button>
          </div>
        </form>
      </div>
      {isSuccessModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-center text-green-600 font-bold text-lg mb-2">Product published successfully!</p>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
