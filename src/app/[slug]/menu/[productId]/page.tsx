import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

interface ProductPageProps {
    params: Promise<{slug: string , productId: string}>;
}




const ProductPage = async ({params}: ProductPageProps) => {
    const {slug, productId} = await params
    const product = await db.product.findUnique({where: {id: productId}})

    if(!product){
        return notFound()
    }

    return (<>

<ProductHeader product={product}/>


    
    <h1>
        page    
        {slug}
        {productId}
        </h1> 
    
    
    </>);
}
 
export default ProductPage;