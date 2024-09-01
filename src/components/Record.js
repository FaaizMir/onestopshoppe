import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Record = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowNewPasswordForm(true);
        setMessage('');
      } else {
        const data = await response.json();
        setMessage(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
      setShowModal(true);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        setMessage('Password updated successfully.');
        setEmail('');
        setPassword('');
        setNewPassword('');
        setShowNewPasswordForm(false);
        setShowModal(true);
      } else {
        const data = await response.json();
        setMessage(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
      setShowModal(true);
    }
  };

  return (

    <div className="max-w-md mt-12 mx-auto bg-gray-100 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Management</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Authenticate
        </button>
        
      </form>
      

      {showNewPasswordForm && (
        <form className="mt-8" onSubmit={handleNewPasswordSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
                           type="password"
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                           required
                         />
                       </div>
                       <button
                         type="submit"
                         className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                       >
                         Update Password
                       </button>
                      

                     </form>
                   )}
                    <br/>
                       <br/>
                   <Link
        to="/main"
        className="self-end bg-blue-500 text-white rounded px-8 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
      >
        Go Back
      </Link>
                  
                   {showModal && (
                     <div className="fixed inset-0 flex items-center justify-center z-50">
                       <div className="bg-white p-6 rounded shadow-lg">
                         <h2 className="text-xl font-bold mb-4">Message</h2>
                         <p className="mb-4">{message}</p>
                         <button
                           className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                           onClick={() => setShowModal(false)}
                         >
                           Close
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
               );
             };
             
             export default Record;
             
