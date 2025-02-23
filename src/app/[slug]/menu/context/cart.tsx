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

        const productIsAlreadyOnTheCart = products.some(prevProducts => prevProducts.id === product.id)

        if (!productIsAlreadyOnTheCart){
            return setProduct((prev) => [...prev, product]);
        }
        
        setProduct(prevProducts => {
            return prevProducts.map(prevProduct => {
                if(prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity +  product.quantity,
                    }
                }
                return prevProducts
            })
        })
    

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


