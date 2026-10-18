"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default  function Productsdetails() {
  let [products,setProducts] = useState([])
    let {id} = useParams()
   async function fetchSingleProduct(){
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await response.json()
      setProducts(data)
    }
    useEffect(()=>{
      fetchSingleProduct()
    },[id])
  return (
    <div>
      <h1>this is product detail page </h1>
        {id}
        {products.title}

        <img src={products.image} />
    </div>
  )
}
