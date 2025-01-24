import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MostPopularProducts() {
    const [mostPopularProducts, setMostPopularProducts] = useState([]);

    useEffect(() => {
        const fetchMostPopularProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/products/most-popular');
                setMostPopularProducts(response.data);
            } catch (error) {
                console.error('Error fetching most popular products:', error);
            }
        };

        fetchMostPopularProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Most Popular Products</h2>
            <div className="row">
                {mostPopularProducts.map((product) => (
                    <div key={product.id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <p className="card-text">Purchased {product.timesPurchased} times</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostPopularProducts;