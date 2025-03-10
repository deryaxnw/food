"use client"



import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";


export interface CartProduct extends Pick<Product, 'name' | 'id' | 'price' | 'imageUrl'> {
    quantity: number;
}





export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    total: number;
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void
    decreaseProductQuantity: (productId: string) => void
    increaseProductQuantity:(productId: string) => void
    RemoveProduct: (productId: string) => void
}


export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    total: 0,
    toggleCart: () => {},
    addProduct: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    RemoveProduct: () => {},
})



export const CartProvider = ({children} : {children: ReactNode }) => {
    const [products, setProduct] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0)


    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    const addProduct = (product: CartProduct) => {

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

    const decreaseProductQuantity = (productId: string) => {
        setProduct(prevProducts => {
            return prevProducts.map(prevProduct => {

                if (prevProduct.id != productId) {
                    return prevProduct;
                }
                    if (prevProduct.quantity === 1){
                        return prevProduct
                    }
                    return {...prevProduct, quantity: prevProduct.quantity - 1}
            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProduct(prevProducts => {
            return prevProducts.map(prevProduct => {

                if (prevProduct.id != productId) {
                    return prevProduct;
                }
                
                    return {...prevProduct, quantity: prevProduct.quantity + 1}
            })
        })
    }

    const RemoveProduct = (productId: string) => {
        setProduct(prevProducts => prevProducts.filter(prevProducts => prevProducts.id != productId))
    }

    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            toggleCart: toggleCart,
            addProduct: addProduct,
            decreaseProductQuantity: decreaseProductQuantity, 
            increaseProductQuantity: increaseProductQuantity,
            RemoveProduct: RemoveProduct,
            total: total
        }}>
            {children}
        </CartContext.Provider>
    )
}


