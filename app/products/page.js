// "use client"
// import Link from "next/link";
// import ProductService from "../services/productServices";
// import { useEffect, useState } from "react";

// export default  function ProductsList({ searchParams }) {
//   const [product,setProducts] = useState([])
//   const resolvedSearchParams =  searchParams;
//     const category = resolvedSearchParams?.category;
//     const limit = resolvedSearchParams?.limit;
//   try {
//     const fetchProducts = async () => {
//       const products = await ProductService.getProducts();
//       setProducts(products)
//     }
//     useEffect(() => {
//       fetchProducts()
//     },[])
//     if (!product || !Array.isArray(product)) {
//       throw new Error("Invalid products data received");
//     }

//     let filteredProducts = product;

//     if (category) {
//       filteredProducts = filteredProducts.filter(
//         (prod) => prod.category?.toLowerCase() === category.toLowerCase()
//       );
//     }

//     if (limit) {
//       filteredProducts = filteredProducts.slice(0, Number(limit));
//     }

//     return (
//       <div className="products-container">
//         {filteredProducts.map((prod) => (
//           <div className="product-card" key={prod.id}>
//             <div className="product-image-container">
//               <img
//                 src={prod.image}
//                 alt={prod.title}
//                 className="product-image"
//               />
//             </div>

//             <div className="product-content">
//               <h3 className="product-title">{prod.title}</h3>

//               <p className="product-description">{prod.description}</p>

//               <div className="product-rating">
//                 ⭐ {prod.rating?.rate} / 5
//                 <span>({prod.rating?.count} reviews)</span>
//               </div>

//               <div className="product-bottom">
//                 <h2 className="product-price">
//                   ${prod.price?.toFixed(2)}
//                 </h2>

//                 <Link href={`/products/${prod.id}`}>
//                   <button className="product-button">
//                     View Product
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   } catch (error) {
//     console.error("Error loading products:", error);
//     return (
//       <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
//         <h2>Failed to load products.</h2>
//         <p><strong>Error Details:</strong> {error.message}</p>
//       </div>
//     );
//   }
// }
"use client";

import Link from "next/link";
import ProductService from "../services/productServices";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get search params safely on the client side
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await ProductService.getProducts();

        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid products data received");
        }

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading products...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h2>Failed to load products.</h2>
        <p><strong>Error Details:</strong> {error}</p>
      </div>
    );
  }

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (prod) => prod.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  return (
    <div className="products-container">
      {filteredProducts.map((prod) => (
        <div className="product-card" key={prod.id}>
          <div className="product-image-container">
            <img
              src={prod.image}
              alt={prod.title}
              className="product-image"
            />
          </div>

          <div className="product-content">
            <h3 className="product-title">{prod.title}</h3>
            <p className="product-description">{prod.description}</p>

            <div className="product-rating">
              ⭐ {prod.rating?.rate} / 5
              <span>({prod.rating?.count} reviews)</span>
            </div>

            <div className="product-bottom">
              <h2 className="product-price">
                ${prod.price?.toFixed(2)}
              </h2>

              <Link href={`/products/${prod.id}`}>
                <button className="product-button">
                  View Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}