import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  selectuserinfo, fetchuserinfoAync } from '../userSlice';
import { selectcheckuser, updateUseraync } from '../../auth/authSlice';
import { useForm } from 'react-hook-form';

const Userprofile = () => {
    // let [edit , setedit] = useState(null)
    let dispatch = useDispatch();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    let userinfo = useSelector(selectcheckuser);
  console.log("userprofileuserinfo",userinfo)
    const handleEditAddress = (addressId) => {
        // Handle edit address logic here
        console.log('Edit address with ID:', addressId);
    };

    const handleRemoveAddress = (addressId) => {
        // Handle remove address logic here
        console.log('Remove address with ID:', addressId);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
            <form
                noValidate
                onSubmit={handleSubmit((data) => {
                    dispatch(updateUseraync({ ...userinfo, addresses: [...userinfo.addresses, data] }));
                    reset();
                })}
            >
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
                    <div className="sm:col-span-4">
                        <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                            Full name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("fullname", { required: "Please enter a full name" })}
                                id="fullname"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                {...register("email", { required: "Please enter a valid email" })}
                                type="email"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone
                        </label>
                        <div className="mt-2">
                            <input
                                id="tel"
                                {...register("tel", { required: "Please enter a valid phone number" })}
                                type="tel"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.tel && <p className="text-red-500 text-xs mt-1">{errors.tel.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("street", { required: "Please enter a street address" })}
                                id="street"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("city", { required: "Please enter a city name" })}
                                id="city"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                            State / Province
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("region", { required: "Please enter a region" })}
                                id="region"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="postal" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("postal", { required: "Please enter a postal code" })}
                                id="postal"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.postal && <p className="text-red-500 text-xs mt-1">{errors.postal.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>

            <div className="p-6 mt-10 bg-gray-50 shadow-inner rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Your Profile</h1>

                {userinfo && (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Full Name: {userinfo.addresses.fullname}</h2>
                            <p className="text-gray-700">Email: {userinfo.email}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Addresses</h3>
                            <div className="space-y-4">
                                {userinfo.addresses.map((address, index) => (
                                    <div key={index} className="border p-4 rounded-md bg-white shadow-sm">
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
    );
};

export default Userprofile;
