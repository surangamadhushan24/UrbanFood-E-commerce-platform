import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

function ProductListings() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add items to the cart!');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/cart',
                product,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Product added to cart!');
            console.log('Backend Response:', response.data);
        } catch (error) {
            alert('Failed to add item to cart!');
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            {/*<h1>Product Listings</h1>*/}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductListings;