import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'

function ProductListings() {

  const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const token = localStorage.getItem('token')
  //       const response = await axios.get('http://localhost:8080/api/v1/products', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       setProducts(response.data)
  //     }
  //     catch (error) {
  //       console.error('Error fetching product ' + error)
  //     }
  //   }
  //   fetchProducts()
  // }, [])

  useEffect(()=>{
    const fetchProduct = async ()=>{
      try {
        const response = await axios.get('http://localhost:8080/api/v1/products')
        setProducts(response.data)
      }
      catch (error){
        console.log(error)
      }
    };

    fetchProduct();

  },[])

  return (
    <>
      <Navbar />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card" style={{ width: '18rem' }}>
              <img  src={product.image} className="card-img-top" alt="..."  />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <a href="#" className="btn btn-primary ">Add to cart</a>
                <br/>
                <a href="#" className="btn btn-primary">Buy Now</a>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductListings;