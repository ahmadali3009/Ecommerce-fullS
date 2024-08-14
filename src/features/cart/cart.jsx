import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deleteCartaync, selectcart , selectcartbyid, updateCartaync} from "./cartslice"
import {selectcheckuser} from "../auth/authSlice"
import { handler } from '@tailwindcss/aspect-ratio'

const Cart = () => {
    let dispatch =  useDispatch()
    const [open, setOpen] = useState(true)
    const handlequnatity = (e, product)=>
        {
            dispatch(updateCartaync({...product , quantity: +e.target.value}))
        }
    const handledelete = (e, productid) =>
    {
        dispatch(deleteCartaync(productid))
    }
    let cartproduct = useSelector(selectcart)
    console.log("cartproduct___________________---" , selectcart)
 
    let initialValue = 0 
    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-9">Shopping Cart</h1>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartproduct.map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={product.href}>{product.title}</a>
                                                </h3>
                                                <p className="ml-4">{product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm mb-5">
                                            {/* {product.quantity} */}
                                            <div className='text-gray-600'>
                                                <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900">
                                                    Qty
                                                </label>
                                                <select onChange={(e)=>handlequnatity(e,product)} value={product.quantity} className='ml-3'>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>

                                                </select>
                                            </div>
                                            <div className="flex">
                                                <button onClick={(e)=>handledelete(e , product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{
                            
                            cartproduct.reduce((amount, product) => product.price * product.quantity + amount,
                            initialValue,).toFixed(2)
                            
                            }</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or{' '}
                            <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Cart
