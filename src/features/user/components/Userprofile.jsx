import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { featchorderbyuseridaAync, selectuserinfo, selectuserorder } from '../userSlice'
import { selectcheckuser } from '../../auth/authSlice'
import { useForm } from 'react-hook-form'

const Userprofile = () => {

    let dispatch =  useDispatch()
   const { register, handleSubmit, watch, reset, formState: {errors}} = useForm()

    let userinfo = useSelector(selectuserinfo)
       const handleEditAddress = (addressId) => {
        // Handle edit address logic here
        console.log('Edit address with ID:', addressId);
    };

    const handleRemoveAddress = (addressId) => {
        // Handle remove address logic here
        console.log('Remove address with ID:', addressId);
    };
  return (
    <div>

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

  <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

            {userinfo && userinfo.length > 0 && (
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">Full Name: {userinfo[0].addresses[0].fullname}</h2>
                        <p className="text-gray-700">Email: {userinfo[0].email}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Addresses</h3>
                        <div className="space-y-4">
                            {userinfo[0].addresses.map((address, index) => (
                                <div key={index} className="border p-4 rounded-md">
                                    <p><strong>Full Name:</strong> {address.fullname}</p>
                                    <p><strong>Email:</strong> {address.email}</p>
                                    <p><strong>Tel:</strong> {address.tel}</p>
                                    <p><strong>Street:</strong> {address.street}</p>
                                    <p><strong>City:</strong> {address.city}</p>
                                    <p><strong>Region:</strong> {address.region}</p>
                                    <p><strong>Postal:</strong> {address.postal}</p>
                                    <div className="mt-4 flex space-x-4">
                                        <button
                                            onClick={() => handleEditAddress(index)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleRemoveAddress(index)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Userprofile
