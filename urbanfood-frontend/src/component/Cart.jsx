import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowRight } from 'react-icons/fa'; // Icons from React Icons

function Cart() {
    const [cart, setCart] = useState({ products: [], totalAmount: 0.0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('You must be logged in to view the cart.');
                setError('You must be logged in to view the cart.');
                return;
            }

            const response = await axios.get('http://localhost:8080/api/v1/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Backend Response:', response.data);
            setCart(response.data || { products: [], totalAmount: 0.0 });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setError('Failed to fetch cart items. Please try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Remove item from cart
    const handleRemoveFromCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to remove items from the cart.');
                return;
            }

            const response = await axios.delete(
                `http://localhost:8080/api/v1/cart/remove/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Backend Response:', response.data);
            setCart(response.data);
            alert('Product removed from cart!');
        } catch (error) {
            console.error('Error removing product from cart:', error);
            alert('Failed to remove product from cart!');
        }
    };

    // Navigate to payment page
    const handleProceedToPayment = () => {
        if (cart.products.length === 0) {
            alert('Your cart is empty. Add products to proceed to payment.');
            return;
        }
        navigate('/payment');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">
                <FaShoppingCart className="me-2" />
                Your Cart
            </h1>
            {cart.products?.length === 0 ? (
                <div className="text-center">
                    <p>Your cart is empty.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {cart.products.map((item) => (
                        <div key={item.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={item.image || 'https://via.placeholder.com/300'}
                                    className="card-img-top"
                                    alt={item.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    
                                    <p className="card-text h5">${item.price.toFixed(2)}</p>
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        <FaTrash className="me-2" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.products?.length > 0 && (
                <div className="mt-4 text-center">
                    <h3>Total Amount: ${cart.totalAmount.toFixed(2)}</h3>
                    <button
                        className="btn btn-success btn-lg"
                        onClick={handleProceedToPayment}
                    >
                        <FaArrowRight className="me-2" />
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;