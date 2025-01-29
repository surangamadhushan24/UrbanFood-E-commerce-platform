import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaShoppingCart } from 'react-icons/fa'; // Icons from React Icons

function MostPopularProducts() {
    const [mostPopularProducts, setMostPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        const fetchMostPopularProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/products/most-popular');
                setMostPopularProducts(response.data);
            } catch (error) {
                console.error('Error fetching most popular products:', error);
                setError('Failed to fetch most popular products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMostPopularProducts();
    }, []);

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
            <h3 className="mb-4">Trending products</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {mostPopularProducts.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.image || 'https://via.placeholder.com/300'}
                                className="card-img-top"
                                alt={product.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-muted">{product.description}</p>
                                <p className="card-text h5">${product.price.toFixed(2)}</p>
                                <p className="card-text">
                                    <FaShoppingCart className="me-2" />
                                    Purchased {product.timesPurchased} times
                                </p>
                                <div className="d-flex align-items-center">
                                    <FaStar className="text-warning me-1" />
                                    <span>{product.rating || 'No ratings yet'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostPopularProducts;