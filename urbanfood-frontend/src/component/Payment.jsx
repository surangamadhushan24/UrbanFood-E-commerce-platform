import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to make a payment.');
                return;
            }

            // Fetch cart details
            const cartResponse = await axios.get('http://localhost:8080/api/v1/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const cart = cartResponse.data;

            // Create payment
            const paymentResponse = await axios.post(
                'http://localhost:8080/api/v1/payment',
                {
                    customerId: cart.userId, // Replace with actual user ID
                    paymentDate: new Date().toISOString(),
                    amount: cart.totalAmount,
                    paymentMethod: paymentMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Payment Response:', paymentResponse.data);

            // Create order
            const orderResponse = await axios.post(
                'http://localhost:8080/api/v1/order',
                {
                    customerId: cart.userId, // Replace with actual user ID
                    productIds: cart.products.map((product) => product.id),
                    orderDate: new Date().toISOString(),
                    totalAmount: cart.totalAmount,
                    payment: paymentResponse.data,
                    status: 'Completed',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Order Response:', orderResponse.data);

            // Clear the cart
            await axios.delete('http://localhost:8080/api/v1/cart/clear', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Set order details
            setOrderDetails(orderResponse.data);
            alert('Payment successful! Order created.');
        } catch (error) {
            console.error('Error during payment or order creation:', error);
            alert('Failed to process payment or create order!');
        }
    };

    return (
        <div className="container card p-5 mt-5">
            <h1 className="text-center">Payment</h1>
            {orderDetails ? (
                <div>
                    <h2>Order Details</h2>
                    <p><strong>Order ID:</strong> {orderDetails.id}</p>
                    <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
                    <p><strong>Status:</strong> {orderDetails.status}</p>
                    <p><strong>Payment Method:</strong> {orderDetails.payment.paymentMethod}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Payment Details</h2>
                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <select
                            className="form-select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                    <button
                        className="btn btn-success"
                        onClick={handlePayment}
                    >
                        Confirm Payment
                    </button>
                </div>
            )}
        </div>
    );
}

export default Payment;