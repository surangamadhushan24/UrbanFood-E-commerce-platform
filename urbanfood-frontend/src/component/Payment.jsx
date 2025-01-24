import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyCheckAlt, FaPaypal, FaCheckCircle } from 'react-icons/fa'; // Icons from React Icons

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // Loading state for payment processing
    const navigate = useNavigate();

    const handlePayment = async () => {
        setError(''); // Clear previous errors
        setIsProcessing(true); // Set loading state

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
            setError('Failed to process payment or create order. Please try again.');
        } finally {
            setIsProcessing(false); // Reset loading state
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
                <h1 className="text-center mb-4">Payment</h1>
                {orderDetails ? (
                    <div className="text-center">
                        <FaCheckCircle className="text-success mb-3" size={50} />
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> {orderDetails.id}</p>
                        <p><strong>Total Amount:</strong> ${orderDetails.totalAmount.toFixed(2)}</p>
                        <p><strong>Status:</strong> {orderDetails.status}</p>
                        <p><strong>Payment Method:</strong> {orderDetails.payment.paymentMethod}</p>
                        <button
                            className="btn btn-primary w-100 mt-3"
                            onClick={() => navigate('/dashboard')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2>Payment Details</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label className="form-label">Payment Method</label>
                            <select
                                className="form-select"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Credit Card">
                                    <FaCreditCard className="me-2" />
                                    Credit Card
                                </option>
                                <option value="Debit Card">
                                    <FaMoneyCheckAlt className="me-2" />
                                    Debit Card
                                </option>
                                <option value="PayPal">
                                    <FaPaypal className="me-2" />
                                    PayPal
                                </option>
                            </select>
                        </div>
                        <button
                            className="btn btn-success w-100"
                            onClick={handlePayment}
                            disabled={isProcessing || !paymentMethod}
                        >
                            {isProcessing ? (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Confirm Payment'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payment;