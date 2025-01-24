import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail({ handleAddToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Product Detail Page</h1>
            <p>Product ID: {id}</p>
            <div>
                <img src={product.image} alt={product.name} style={{ width: '300px', height: 'auto' }} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)} // Pass the full product object
                >
                    Add to Cart
                </button>
            </div>
        </>
    );
}

export default ProductDetail;