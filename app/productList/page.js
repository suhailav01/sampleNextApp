
export const instant = false
import { headers } from 'next/headers'
import ProductService from '../services/productServices'


export default async function ProductList() {
  const headersList = await headers()
  const referer  = headersList.get('referer')
  console.log("headers data",referer);
  const products = await ProductService.getProducts()

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <h1>{p.title}</h1>
        </div>
      ))}
    </div>
  )
}
