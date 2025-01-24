import React, { useState } from 'react';

function PaymentForm({ totalAmount, onPayment }) {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
        onPayment({ paymentMethod });
    };

    return (
        <div className="mt-3">
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
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
                <p><strong>Total Amount:</strong> ${totalAmount}</p>
                <button type="submit" className="btn btn-success">
                    Confirm Payment
                </button>
            </form>
        </div>
    );
}

export default PaymentForm;