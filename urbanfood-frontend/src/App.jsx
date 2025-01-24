import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import RegistrationForm from './component/RegistrationForm';
import ProductListings from './component/ProductListings';
import ProductDetail from './component/ProductDetail';
import Cart from './component/Cart';
import Payment from './component/Payment';
import MostPopularProducts from './component/MostPopularProducts';
import AddProductForm from './component/AddProductForm';

import axios from 'axios';

function App() {
    // Check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem('token');

    // Define handleAddToCart function
    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add items to the cart!');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/cart',
                product, // Pass the full product object
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Product added to cart!');
            console.log('Backend Response:', response.data);
        } catch (error) {
            alert('Failed to add item to cart!');
            console.error(error);
        }
    };

    return (
        <Router>
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegistrationForm />} />

                {/* Protected Routes (Require Authentication) */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <ProductListings />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/dashboard/:id"
                    element={
                        isAuthenticated ? (
                            <ProductDetail handleAddToCart={handleAddToCart} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/cart"
                    element={
                        isAuthenticated ? (
                            <Cart />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/payment"
                    element={
                        isAuthenticated ? (
                            <Payment />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/most-popular"
                    element={
                        isAuthenticated ? (
                            <MostPopularProducts />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/add-product"
                    element={
                        isAuthenticated ? (
                            <AddProductForm />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                
            </Routes>
        </Router>
    );
}

export default App;