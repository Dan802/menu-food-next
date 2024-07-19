import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  console.log('Adding the seeding data to the data base')
  try {
    await prisma.category.createMany({
      data: categories
    })

    await prisma.product.createMany({
      data: products
    })
  } catch (error) {
    console.log(error)
  }
}

// to run main(): npx prisma db seed
// main add the example values
main() 
  .then( async () => {
    // and then we discconnect to free resources
    await prisma.$disconnect()
  })
  .catch( async (error) => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  })