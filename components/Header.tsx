import Image from "next/image"
import Link from "next/link"
import { 
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { useRecoilValue } from "recoil"
import { cartState } from "../atoms/cartAtom"

const Header = () => {

    const totalCartItems = useRecoilValue(cartState).length

    const session = false

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4">
        <div className="flex items-center justify-center md:w-[20%]">
            <Link href={"/"} >
                <div className="relative h-10 w-10 cursor-pointer opacity-75 transition hover:opacity-100">
                    <Image src={"https://rb.gy/vsvv2o"} layout="fill" objectFit="contain" />
                </div>
            </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
            <a className="headerLink">Products</a>
            <a className="headerLink">Explore</a>
            <a className="headerLink">Support</a>
            <a className="headerLink">Business</a>
        </div>

        <div className="flex items-center justify-center gap-x-4 md:w-1/5"> 
            <MagnifyingGlassIcon className="headerIcon"/>
            
            <Link href={"/checkout"}>
                <div className="relative cursor-pointer">
                    {totalCartItems > 0 && (
                        <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center
                        justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                            {totalCartItems}
                        </span>
                    )}
                <ShoppingBagIcon className="headerIcon" />
                </div>
            </Link>

            {session ? (
                <Image 
                src="https://avatars.githubusercontent.com/u/80095257?v=4" 
                alt=""
                className="cursor-pointer rounded-full"
                width={34}
                height={34}
                />
            ) : (
                <UserIcon className="headerIcon"/>
            )}
        </div>
    </header>
  ) 
}

export default Header