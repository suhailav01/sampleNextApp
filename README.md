This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



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

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (prod) => prod.category === category
    );
  }

  // Limit the number of products
  if (limit) {
    filteredProducts = filteredProducts.slice(
      0,
      Number(limit)
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
//   static async getProductById(id) {
//     const response = await fetch(
//       `https://fakestoreapi.com/products/${id}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch product");
//     }

//     return response.json();
//   }