import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductReviews({ productId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/reviews/product/${productId}`
                );
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [productId]);

    return (
        <div className="container mt-5">
            <h3>Product Reviews</h3>
            {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
                <div className="row">
                    {reviews.map((review) => (
                        <div key={review.id} className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{review.rating} Stars</h5>
                                    <p className="card-text">{review.comment}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Reviewed on {new Date(review.timestamp).toLocaleString()}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductReviews;