interface Category {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: "category"
    slug: {
        _type: "slug"
        current: string
    }
    title: string
}

interface Image {
    _key: string
    _type: "image"
    asset: {
        url: string
    }
}

interface Product {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    type: "product"
    slug: {
        _type: "slug"
        current: string
    }
    description: string
    category: {
        _ref: string
        _type: string
    }
    image: Image[]
    price: number
    title: string
}

interface StripeProduct {
    id: string
    amount_discount: number
    amount_subtotal: number
    amount_tax: number
    amount_total: number
    currency: string
    description: string
    object: string
    quantity: number
    price: {
        unit_amount: number
    }
}