import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Card from './Card';

function ProductListings() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/products');
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <>
           
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <Card product={product} key={product.id} />
                ))}
            </div>
        </>
    );
}

export default ProductListings;