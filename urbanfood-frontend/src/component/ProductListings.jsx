
import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Card from './Card';

function ProductListings() {

  const [products, setProducts] = useState([])

  const handleAddToCart = async (productId,price) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to the cart!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/cart', {id:productId,price:price}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(response.data);
    } catch (error) {
      alert('Failed to add item to cart!');
    }
  };



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
   
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <Card product={product} key={product.id} handleAddToCart={handleAddToCart} />
        ))}
      </div>
    </>
  )
}

export default ProductListings;