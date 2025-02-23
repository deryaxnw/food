"use client"



import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";


interface CartProducts extends Pick<Product, 'name' | 'id' | 'price' | 'imageUrl'> {
    quantity: number;
}





export interface ICartContext {
    isOpen: boolean;
    products: CartProducts[];
    toggleCart: () => void;
    addProduct: (product: CartProducts) => void
}


export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {}
})



export const CartProvider = ({children} : {children: ReactNode }) => {
    const [products, setProduct] = useState<CartProducts[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    const addProduct = (product: CartProducts) => {
        setProduct(prev => ([...prev, product]))
    }



    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            toggleCart: toggleCart,
            addProduct: addProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}


