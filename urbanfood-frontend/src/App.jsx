import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import ProductListings from './component/ProductListings';
import ProductDetail from './component/ProductDetail';
import Navbar from './component/Navbar';
import Cart from './component/Cart';
import Payment from './component/Payment'; // Import the new Payment component
import axios from 'axios';
import MostPopularProducts from './component/MostPopularProducts';
import RegistrationForm from './component/RegistrationForm';
import AddProductForm from './component/AddProductForm';

function App() {
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
            console.log(error);
        }
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegistrationForm />}/>
                <Route path="/dashboard" element={<ProductListings />} />
                <Route
                    path="/dashboard/:id"
                    element={<ProductDetail handleAddToCart={handleAddToCart} />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} /> 
                <Route path="/most-popular" element={<MostPopularProducts />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
                <Route path="/add-product" element={<AddProductForm />} />
            </Routes>
        </Router>
    );
}

export default App;