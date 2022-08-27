export const fetchProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/getProducts`)

    const data = await res.json()

    console.log(data)

    const products: Product[] = data.products

    return products
    
}