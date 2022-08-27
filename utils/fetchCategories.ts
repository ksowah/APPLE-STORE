export const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/getCategories`)
    
    const data = await res.json()

    console.log(data)
    
    
    const categories: Category[] = data.categories

    return categories
}

