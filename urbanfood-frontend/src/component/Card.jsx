import React from 'react'
import { useNavigate } from 'react-router-dom'  

function Card({product,handleAddToCart}) {
    const navigate = useNavigate();

    return (
        <>

            <div className="col" key={product.id} onClick={() => navigate(`/dashboard/${product.id}`)}>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.price}</p>
                        {/* <center>
                            <button className="btn btn-primary " onClick={() => handleAddToCart(product.id, product.price)}>Add to Cart</button>
                        </center> */}


                    </div>
                </div>
            </div>

        </>
    )
}

export default Card
