import Link from "next/link";
export default async function ProductsList({ searchParams }) {
  try {
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams?.category;
    const limit = resolvedSearchParams?.limit;

    const response = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    let filteredProducts = data;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.category.toLowerCase() === category.toLowerCase()
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
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h2>Failed to load products.</h2>
        <p><strong>Error Details:</strong> {error.message}</p>
      </div>
    );
  }
}