import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function History() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/history', {
          headers: { token },
          params: { userId }
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId && token) {
      fetchData();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">User History</h2>
      {userData ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-2xl">Sender</th>
              <th className="py-2 px-4 border-b text-2xl">Message</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userData) && userData.length > 0 ? (
              userData.map((history, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : ''}>
                  <td className="py-2 px-4 border-b">{history.sender}</td>
                  <td className="py-2 px-4 border-b">{history.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
                  {userData ? 'No chat history found.' : 'Loading user data...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
