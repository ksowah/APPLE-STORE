import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { cartState } from '../atoms/cartAtom'

const Basket = () => {

    const totalCartItems = useRecoilValue(cartState).length

    if (totalCartItems === 0) return null;

  return (
    <Link href={"/checkout"}>
    <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {totalCartItems > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
            {totalCartItems}
          </span>
        )}
        <ShoppingBagIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  )
}

export default Basket