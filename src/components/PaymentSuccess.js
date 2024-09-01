import React, { useEffect } from 'react';

function PaymentSuccess() {

  useEffect(() => {
    // Redirect to main route after 5 seconds
    const redirectTimeout = setTimeout(() => {
      window.location.href = ('/main');
    }, 5000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-green-500 p-4 rounded-full mb-4">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
      <p className="text-gray-600">Thank you for your purchase.</p>
    </div>
  );
}

export default PaymentSuccess;
