// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import RajvenBooking from './Pages/reservation';
import FoodDetailPage from './Pages/FoodDetailPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <div className="AllPage">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
        <Route path="/food/:id" element={<FoodDetailPage />} />
                <Route path="/Reservations" element={<RajvenBooking/>} />
                <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              </Routes>
            </div>
            <Toaster position="top-right" />

    <Footer/>

          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;













