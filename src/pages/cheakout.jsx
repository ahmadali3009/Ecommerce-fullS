import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartaync, selectcart, updateCartaync } from '../features/cart/cartslice'
import { useForm } from 'react-hook-form'
import { selectcheckuser, updateUseraync } from '../features/auth/authSlice'
import { createorderaync } from '../features/order/orderSlice'


const Cheakout = () => {
  let cartproduct = useSelector(selectcart)
  console.log("cartproduct in checkout" , cartproduct)
  let totalamount = (cartproduct) => {
    return cartproduct.reduce((amount, products) => 
        products.product.price * products.quantity + amount,
        0 // initialValue should be 0
    ).toFixed(2);
};

console.log("ammountcheckingg", totalamount(cartproduct));
  const { register, handleSubmit, watch, reset, formState: {errors}} = useForm()
  let [paymentmethod , setpaymentmethod] = useState("")
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
  
  let user = useSelector(selectcheckuser)
  console.log("cartproduct___________________---" , selectcart)

  const handlepayment = (e)=>{
    console.log(e.target.id)
    setpaymentmethod(e.target.id)
  }
  const handleOrder = (e)=>
    {
      // e.preventDefault()
      let orderdata = {
        products: cartproduct, // Match with the "products" field in the schema
        totalAmount: totalamount(cartproduct),
        user: user.id, // Match with the "user" field in the schema
        paymentMethod: paymentmethod, // Match with the "paymentMethod" field in the schema
        status: "pending", // Optional if you want to set a default status
        selectedAddress: user.addresses, // Make sure to provide this if it's required
    };      
    dispatch(createorderaync(orderdata))
    console.log(e.target.value)
    }
   
  let initialValue = 0 


  return (
    <div>
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
    <div className='lg:col-span-3 bg-slate-100'>
       <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
          <form noValidate onSubmit={handleSubmit((data)=>{dispatch(updateUseraync({...user,addresses:[...user.addresses,data]}))
          reset()}
        )}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("fullname" , { required: "plz enter a full name" })}                  
                  id="fullname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email" , { required: "plz enter a vaild email" })}                  
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="tel"
                  {...register("tel" , { required: "plz enter a vaild phone-number" })}                  
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street" , { required: "plz enter a street address" })}                  
                  id="street"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city" , { required: "plz enter a city name" })}                  
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("region" , { required: "plz enter a region" })}                  
                  id="region"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("postal" , { required: "plz enter a postal code" })}                  
                  id="postal"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button className='bg-cyan-700' > save </button>
          </div>
          </form>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
         
            <div className='addresses'>
            <ul role="list" className="divide-y divide-gray-100">
      {user?.addresses.map((address) => (
        <li key={address.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.fullname}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.postal}</p>


            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900"><strong>Street-Address: </strong>{address.street}</p>
            <p className="text-sm leading-6 text-gray-900"><strong>City:</strong> {address.city}</p>
            <p className="text-sm leading-6 text-gray-900"><strong>Province:</strong> {address.region}</p>

            
          </div>
        </li>
      ))}
    </ul>
            </div>
          <div className="mt-10 space-y-10">
     
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="COD"
                    name="Payments"
                    onChange={handlepayment}
                    checked={paymentmethod === 'COD'}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="COD" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash On Delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="COC"
                    name="Payments"
                    onChange={handlepayment}
                    checked={paymentmethod === 'COC'}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="COC" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash on Card
                  </label>
                </div>
            
              </div>
            </fieldset>
          </div>
        </div>
      </div>

    
      </main>
    
    </div>
    <div className='lg:col-span-2'>

    <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-9">Shopping Cart</h1>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartproduct.map((products) => (
                                <li key={products.product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={products.product.thumbnail}
                                            alt={products.product.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={products.product.href}>{products.product.title}</a>
                                                </h3>
                                                <p className="ml-4">{products.product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{products.product.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm mb-5">
                                            {/* {product.quantity} */}
                                            <div className='text-gray-600'>
                                                <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900">
                                                    Qty
                                                </label>
                                                <select onChange={(e)=>handlequnatity(e,productd)} value={products.product.quantity} className='ml-3'>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>

                                                </select>
                                            </div>
                                            <div className="flex">
                                                <button onClick={(e)=>handledelete(e , products.product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                            
                            totalamount
                            
                            }</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            onClick={(e)=>handleOrder(e)}
                            to="/orderpage"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            OrderNow
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

    </div>
    </div>
    </div>
  )
}

export default Cheakout;
