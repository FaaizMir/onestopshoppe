import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Signup from './components/Signup';
import SellerDashboard from './components/SellerDashboard';
import Verify from './components/Verify';
import UploadProduct from './components/UploadProduct';
import ShowProducts from './components/ShowProducts';
import ShoeModel from './components/ShoeModel';
import Humanmodel from './components/Humanmodel';
import Tshirt from './components/Tshirt';
import PaymentSuccess from './components/PaymentSuccess';
import TshirtCustomizer from './components/TshirtCustomizer';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  
useEffect(() => {
  const handleWindowHistory = () => {
    if (window.location.pathname === '/main' && window.location.pathname === '/seller') {
      window.history.pushState(null, null, window.location.pathname);
    }
  };

  window.addEventListener('popstate', handleWindowHistory);

  return () => {
    window.removeEventListener('popstate', handleWindowHistory);
  };
}, []);




  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Signup/>}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Login />}
        />
        <Route
          path="/verify-otp"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Verify />}
        />
        <Route
          path="/main/*"
          element={isAuthenticated ? <Main /> : <Navigate to="/login" replace />}
        />
 <Route
          path="/seller/*"
          element={isAuthenticated ? <SellerDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/upload-product"
          element={isAuthenticated ? <UploadProduct/> : <Navigate to="/login" replace />}
        />
         <Route
          path="/show-all-products"
          element={isAuthenticated ? <ShowProducts/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/shoe-model"
          element={isAuthenticated ? <ShoeModel/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/lady-model"
          element={isAuthenticated ? <Humanmodel /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tshirt-customizer"
          element={isAuthenticated ? <Tshirt /> : <Navigate to="/login" replace />}
        />
       
 <Route
          path="/payment-success"
          element={isAuthenticated ? <PaymentSuccess /> : <Navigate to="/login" replace />}
        />

<Route
          path="/tshirt"
          element={isAuthenticated ? <TshirtCustomizer /> : <Navigate to="/login" replace />}
        />

           
      </Routes>
    </Router>
  );
}

export default App;
