import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[]
  addProduct : (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addProduct: (product) => {

    //# Argument of type (...) is not assignable to 'Store | Partial<Store>'
      //! Argument of type '(state: Store) => { order: ({ id: number; name: string; price: number; image: string; categoryId: number; } | OrderItem)[]; }' is not assignable to parameter of type 'Store | Partial<Store> | ((state: Store) => Store | Partial<Store>)'
    
      // set((state) => ({
      //   order: [...state.order, product]
      // }))
    //# endregion 

    // To fix that: 
    
    const {categoryId, image, ...data} = product
    let order : OrderItem[] = []

    if(get().order.find( item => item.id === product.id)) {
      order = get().order.map(order => order.id === product.id ? {
          ...order, 
          quantity : order.quantity + 1,
          subtotal: order.price * (order.quantity + 1)
        } : order 
      )

    } else {
      order = [...get().order, {
        ...data,
        quantity: 1,
        subtotal: product.price
      }]
    }

    set((state) => ({
      order
    }))

  },
  increaseQuantity: (id) => {
    set((state) => ({
      order : state.order.map(order => order.id === id ? {
          ...order, 
          quantity : order.quantity + 1,
          subtotal: order.price * (order.quantity + 1)
        } : order 
      )
    }))
  }, 
  decreaseQuantity: (id) => {
    const order = get().order.map( item => item.id === id ? {
      ...item, 
      quantity: item.quantity - 1,
      subtotal: item.price * (item.quantity - 1)
    }: item)

    set((state) => ({
      order
    }))
  },
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter(item => item.id !== id)
    }))
  }
}))