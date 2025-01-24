import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ product }) {
    const navigate = useNavigate();

    return (
        <div className="col" key={product.id} onClick={() => navigate(`/dashboard/${product.id}`)}>
            <div className="card" style={{ width: '18rem', cursor: 'pointer' }}>
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;