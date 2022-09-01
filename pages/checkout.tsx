import Head from 'next/head'
import Header from '../components/Header'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import Stripe from "stripe";
import Button from "../components/Button";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/cartAtom';
import CheckoutProducts from '../components/CheckoutProducts';
import { fetchPostJSON } from '../utils/api-helper';
import getStripe from '../utils/get-stripejs';

const Checkout = () => {

    const cartItems = useRecoilValue(cartState)
    const router = useRouter()

    const [groupedItemsInCart, setGroupedItemsInCart] = useState({} as {[key: string]: Product[]})
    const [getTotal, setGetTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
     const groupedItems = cartItems.reduce((results, item) => {
        (results[item._id] = results[item._id] || []).push(item)
        return results
     }, {} as {[key: string]: Product[]})

     setGroupedItemsInCart(groupedItems)
    }, [cartItems])


    const getBasketTotal = () => {
      return cartItems.reduce((total: number, item: Product) => (total += item.price), 0)
    }

    useEffect(() => {
        setGetTotal(getBasketTotal())
    }, [cartItems])
    
    const createCheckoutSession = async () => {
        setLoading(true);
    
        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
          "/api/checkout_session",
          {
            items: cartItems,
          }
        );
   
        // Internal Server Error
        if ((checkoutSession as any).statusCode === 500) {
          console.error((checkoutSession as any).message);
          return;
        }
    
        // Redirect to checkout
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: checkoutSession.id,
        });
    
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
    
        setLoading(false);
      };


  return (
    <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
        <Head>
            <title>Cart - Apple</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className='mx-auto max-w-5xl pb-24'>
            <div className='px-5'>
                <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
                    {cartItems.length > 0 ? "Review your bag" : "Your bag is empty"}
                </h1>
                <p className='py-4'>Free delivery and free returns</p>

                {cartItems.length === 0 && (
                    <Button 
                        title='Continue Shopping'
                        onClick={() => router.push("/")}
                    />
                )} 
            </div>
            {cartItems.length > 0 && (
                <div className='mx-5 md:mx-8'>
                    {Object.entries(groupedItemsInCart).map(([key, items]) => (
                        <CheckoutProducts key={key} items={items} id={key} />
                    ))}

                    <div className='my-12 mt-6 ml-auto max-w-3xl'>
                        <div className='divide-y divide-gray-200'>
                            <div className='pb-4'>
                                <div className='flex justify-between'>
                                    <p>Subtotal</p>
                                    <p>
                                        <Currency quantity={getTotal} currency="USD" />
                                    </p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Shipping</p>
                                    <p>Free</p>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex flex-col gap-x-1 lg:flex-row'>
                                        Estimated tax for {" "}
                                        <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                                            Enter zip code
                                            <ChevronDownIcon className='h-6 w-6' />
                                        </p>
                                    </div>
                                    <p>$</p>
                                </div>
                            </div>

                            <div className='flex justify-between pt-4 text-xl font-semibold'>
                                <h4>Total</h4>
                                <h4>
                                    <Currency quantity={getTotal} currency="USD" />
                                </h4>
                            </div>
                        </div>

                        <div className='py-14 space-y-4'>
                            <h4 className='text-xl font-semibold'>
                                How would you like to check out 
                            </h4>
                            <div className='flex flex-col gap-4 md:flex-row'>
                                <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                                        <span>Pay Monthly</span>
                                        <span>with Apple Card</span>
                                        <span>
                                            $283.16/mo. at 0% APR <span className='-top-2'>◊</span> 
                                        </span>
                                    </h4>

                                    <Button title='Check out with Apple Card Monthly Installment' width='w-full'/>
                                    <p className='mt-2 max-w-[240px] text-[13px]'>
                                    $0.00 due today, which includes applicable full-price items, down payments, shipping, and taxes.
                                    </p>
                                </div>

                                <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                                        Pay in full
                                        <span>
                                        <Currency quantity={getTotal} currency="USD" />
                                        </span>
                                    </h4>

                                    <Button 
                                        noIcon
                                        loading={loading}
                                        title="Check Out"
                                        onClick={createCheckoutSession}
                                        width="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    </div>
  )
}

export default Checkout