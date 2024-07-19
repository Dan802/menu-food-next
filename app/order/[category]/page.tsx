import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category:string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products
}

type OrderPageProps = {
  params : {
    category : string
  }
}

export default async function OrderPage({params} : OrderPageProps) {

  // https:www.*.com/order/[category]
  // {params} = {category: the string after the .../order/*}
  const products = await getProducts(params.category)

  return (
    <>
      <h1 className="text-2xl my-10">Select and customize your order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}