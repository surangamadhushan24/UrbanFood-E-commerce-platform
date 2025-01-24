import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ product, handleAddToCart }) {
    const navigate = useNavigate();

    return (
        <div className="col mb-4" key={product.id}>
            <div
                className="card h-100 shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/dashboard/${product.id}`)}
            >
                <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">${product.price}</p>
                    <button
                        className="btn btn-outline-primary w-100"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation when clicking the button
                            handleAddToCart(product); // Call the handleAddToCart function
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;