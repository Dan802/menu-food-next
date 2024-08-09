"use client"
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"
import { useMemo } from "react"

type AddProductButtonProps = {
  product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {

  const MAX_ITEMS = 5
  const addProduct = useStore((state) => state.addProduct)
  const order = useStore((state) => state.order)
  let cantidad = 0

  for(let item of order) {
    if(item.id === product.id && item.quantity === MAX_ITEMS){
      cantidad = item.quantity
      break;
    } 
  }

  const isAddDisabled = useMemo(() => cantidad === MAX_ITEMS , [cantidad])
  
  return (
    <button 
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer disabled:opacity-20"
      onClick={() => addProduct(product)}
      disabled={isAddDisabled}
    >
      Add
    </button>
  )
}
