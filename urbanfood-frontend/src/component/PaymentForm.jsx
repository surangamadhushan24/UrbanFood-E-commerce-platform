import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaMoneyCheckAlt } from 'react-icons/fa'; // Icons from React Icons

function PaymentForm({ totalAmount, onPayment }) {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            setError('Please select a payment method.');
            return;
        }
        setError('');
        onPayment({ paymentMethod });
    };

    return (
        <div className="card p-4 shadow mt-3">
            <h2 className="mb-4">Payment Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Payment Method Field */}
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

                {/* Total Amount Display */}
                <p className="h5 mb-4">
                    <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
                </p>

                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Submit Button */}
                <button type="submit" className="btn btn-success w-100">
                    Confirm Payment
                </button>
            </form>
        </div>
    );
}

export default PaymentForm;