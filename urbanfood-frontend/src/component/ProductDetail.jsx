import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
    const { id } = useParams();
    console.log(id);

  return (
   <>
    <h1>Product Detail Page</h1>
    <p>Product ID: {id}</p>
   
   </>
  )
}

export default ProductDetail