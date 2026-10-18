"use client"
import { useEffect, useState } from 'react'
import ProductService from '../services/productServices'


export default function ProductList() {
  const [product, setProducts] = useState([])
  const fetchProducts = async () => {
    const products = await ProductService.getProducts()
    setProducts(products)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  console.log("this is fetched data",product);
  
  return (
    <div>
      {product.map((p) => (
        <div key={p.id}>
          <h1>{p.title}</h1>
        </div>
      ))}
    </div>
  )
}
