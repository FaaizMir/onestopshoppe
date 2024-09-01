import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function PaymentFormModal({ 
capturedImage,  productPrice , productId ,onClose }) {



  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    quantity: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create order and send email
      await axios.post('http://localhost:9000/store-order', {
        productId,
        buyerName: formData.name,
        buyerContact: formData.contact,
        buyerAddress: formData.address,
        productQuantity: formData.quantity,
      });

      // Calculate the total amount based on quantity and other factors
      const totalAmount = productPrice * formData.quantity;

      // Create payment request for PayPal
      const response = await axios.post('http://localhost:9000/payment-request', {
        amount: totalAmount,
      });

        // Redirect to PayPal
        window.location.href = response.data.approvalUrl;
    } catch (error) {
      console.log(error.response.data.message);
      // Handle error and display to the user
    }
  };

 


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 mb-4">
            <img src={capturedImage} alt="Customized Shoe" className="mx-auto h-40" />
          </div>
          <div className="w-full md:w-1/2">
           
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                  name="name"
                  placeholder="Enter your name"
                  className="w-full h-10 px-4 py-2 bg-white border rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  onChange={handleInputChange}

                  placeholder="Enter your contact number"
                  className="w-full h-10 px-4 py-2 bg-white border rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleInputChange}

                  rows={3}
                  className="w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={handleInputChange}

                  min="1"
                  placeholder="Enter quantity"
                  className="w-full h-10 px-4 py-2 bg-white border rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              {/* Add more payment form fields here if needed */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      
    </div>

  );
}

export default PaymentFormModal;
