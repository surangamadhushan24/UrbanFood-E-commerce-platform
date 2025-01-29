import React, { useState } from 'react';
import axios from 'axios';
import { FaStar, FaComment } from 'react-icons/fa';

function ReviewForm({ productId, userId }) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to submit a review.');
                return;
            }

            const response = await axios.post(
                'http://localhost:8080/api/v1/reviews',
                {
                    userId,
                    productId,
                    rating,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Review submitted successfully:', response.data);
            alert('Review submitted successfully!');
            setRating(1);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <div className="container card p-4 shadow mt-5">
            <h3 className="mb-4">
                <FaComment className="me-2" />
                Leave a Review
            </h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Rating Field */}
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        <FaStar className="me-2" />
                        Rating
                    </label>
                    <select
                        className="form-select"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value, 10))}
                        required
                    >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                </div>

                {/* Comment Field */}
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                        <FaComment className="me-2" />
                        Comment
                    </label>
                    <textarea
                        className="form-control"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Submit Review'
                    )}
                </button>
            </form>
        </div>
    );
}

export default ReviewForm;