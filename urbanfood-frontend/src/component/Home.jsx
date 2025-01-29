import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import MostPopularProducts from './MostPopularProducts';

function Home() {
    return (
        <div className="container text-center mt-5">
            {/* Hero Section */}
            <div className="jumbotron bg-light p-5 rounded">
                <h1 className="display-4">Welcome to UrbanFood!</h1>
                <p className="lead">
                    Discover the best products at unbeatable prices. Shop now and enjoy a seamless shopping experience.
                </p>
                <hr className="my-4" />
                <p>Explore our wide range of products and start shopping today.</p>
                <div className="mt-4">
                    <Link to="/dashboard" className="btn btn-primary btn-lg me-3">
                        <FaShoppingCart className="me-2" />
                        Shop Now
                    </Link>
                    <Link to="/register" className="btn btn-outline-secondary btn-lg">
                        Sign Up
                    </Link>
                </div>
            </div>

            <MostPopularProducts />

            
            {/* Call to Action Section */}
            <div className="mt-5 bg-light p-5 rounded">
                <h2>Ready to Shop?</h2>
                <p className="lead">Join thousands of happy customers and start shopping today.</p>
                <Link to="/dashboard" className="btn btn-success btn-lg">
                    <FaArrowRight className="me-2" />
                    Explore Products
                </Link>
            </div>
        </div>
    );
}

export default Home;