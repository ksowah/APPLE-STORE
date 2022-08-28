import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { urlFor } from "../sanity"
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
    items: Product[]
    id: string
}

const CheckoutProducts = ({items, id}: Props) => {

    const [allItems, setAllItems] = useState(items)

    const removeBasketItem = () => {
        const index = allItems.findIndex((item: Product) => item._id === id)

        let newCart = [...allItems]

        if(index >= 0) {
            newCart.splice(index, 1)
        }else{
            console.log(`Cant remove product (id: ${id}) as it's not in basket`)
        }

        setAllItems(newCart)

        toast.error(`${allItems[0].title} removed from basket`)
    }

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-200 pb-5 lg:flex-row lg:items-center">
        <div className="relative h-44 w-44" >
            <Image src={urlFor(allItems[0]?.image[0])?.url() || ""} layout="fill" objectFit="contain" />
        </div>

        <div className="flex flex-1 items-end lg:items-center">
            <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
                    <h1 className="font-semibold lg:w-96">{allItems[0].title}</h1>
                    <p className="flex items-end gap-x-1 font-semibold">
                        {allItems.length}
                        <ChevronDownIcon className="h-6 w-6 text-blue-500"/>
                    </p>
                </div>

                <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                    Show product details
                    <ChevronDownIcon className="h-6 w-6"/>
                </p>
            </div>

            <div className="flex flex-col items-end space-y-4">
                <h4 className="text-xl font-semibold lg:text-2xl">
                    <Currency 
                        quantity={allItems.reduce((total, item) => total + item.price, 0)}
                        currency="USD"
                    />
                </h4>

                <button
                    onClick={removeBasketItem}
                    className="text-blue-500 hover:underline"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
  )
}

export default CheckoutProducts