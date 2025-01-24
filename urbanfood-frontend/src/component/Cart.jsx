import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState({ products: [], totalAmount: 0.0 });
    const navigate = useNavigate();

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('You must be logged in to view the cart.');
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

    return (
        <div className="container card p-5 mt-5">
            <h1 className="text-center">Your Cart</h1>
            {cart.products?.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    {cart.products.map((item) => (
                        <div key={item.id} className="col-md-4 mb-3">
                            <div className="card">
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Price: ${item.price}</p>
                                    <p className="card-text">{item.description}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.products?.length > 0 && (
                <div className="mt-3">
                    <h3>Total Amount: ${cart.totalAmount}</h3>
                    <button
                        className="btn btn-primary"
                        onClick={handleProceedToPayment}
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;