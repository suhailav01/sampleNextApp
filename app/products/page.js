
import Link from "next/link";
export default async function ProductsList({ searchParams }) {
  const params = await searchParams;

  const category = params.category;
  const limit = params.limit;

  const response = await fetch(
    "https://fakestoreapi.com/products"
  );

  const data = await response.json();

  let filteredProducts = data;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (prod) => prod.category === category
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(
      0,Number(limit)
    );
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
            <h3 className="product-title">
              {prod.title}
            </h3>

            <p className="product-description">
              {prod.description}
            </p>

            <div className="product-rating">
              ⭐ {prod.rating.rate} / 5
              <span>({prod.rating.count} reviews)</span>
            </div>

            <div className="product-bottom">
              <h2 className="product-price">
                ${prod.price.toFixed(2)}
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





// http://localhost:3000/products?category=electronics&limit=3