



interface OrdersPageProps {
    searchParams: Promise<{cpf: string}>
}

const OrdersPage = async ({searchParams} : OrdersPageProps) => {
    const {cpf} = await searchParams;


}

export default OrdersPage;