import { atom } from "recoil"


const initialCartState: Product[] = []

export const cartState = atom({
    key: "cartState",
    default: initialCartState,
})