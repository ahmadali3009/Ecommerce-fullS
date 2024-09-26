import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {   selectuserinfo, updateUserprofileAync } from '../userSlice';
import {  selectcheckuser } from '../../auth/authSlice';
import { useForm } from 'react-hook-form';
// import { updateUser  } from '../../auth/authapi';

const Userprofile = () => {
    const dispatch = useDispatch();
    const [editIndex, setEditIndex] = useState(null);  // Track the address being edited
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const userinfo = useSelector(selectuserinfo);
    console.log("userinfooooooooooo" , userinfo)
    const currentuser = useSelector(selectcheckuser)
    console.log("currentuser in userprofile ", currentuser)
    if (userinfo === -1) {
        return <div>Loading...</div>;  // Show loading or handle the case where the user is not found
    }


    const handleEditAddress = (index) => {
        setEditIndex(index);  // Set the index of the address being edited
        const address = userinfo?.addresses[index];
        setValue("fullname", address.fullname);
        setValue("email", address.email);
        setValue("tel", address.tel);
        setValue("street", address.street);
        setValue("city", address.city);
        setValue("region", address.region);
        setValue("postal", address.postal);
    };

    const handleRemoveAddress = (index) => {
        // const updatedAddresses = userinfo.addresses.filter((_, addrIndex) => addrIndex !== index);
        // const updatedUser = { ...userinfo, addresses: updatedAddresses };
        // dispatch(updateUserprofileAync(updatedUser));
    };

    const onSubmit = (data) => {
        const updatedAddresses = userinfo?.addresses ? [...userinfo.addresses] : [];

if (editIndex !== null) {
    updatedAddresses[editIndex] = { ...data };  // Ensure data structure is correct
}
const updatedUser = {
    id: userinfo.id,
    email: userinfo.email,
    name: userinfo.name,
    addresses: updatedAddresses
};
console.log("updateuseraddressers", updatedUser)
     dispatch(updateUserprofileAync(updatedUser));
        reset();
        setEditIndex(null);  // Reset the edit index after submission
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
                    {/* Form Fields */}
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
                            Update
                        </button>
                    </div>
                </div>
            </form>

            <div className="p-6 mt-10 bg-gray-50 shadow-inner rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Your Profile</h1>

                {userinfo && (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Full Name: {userinfo.addresses[0]?.fullname}</h2>
                            <p className="text-gray-700">Email: {userinfo?.email}</p>
                            <p className="text-gray-700">role: {userinfo?.role}</p>

                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Addresses</h3>
                            <div className="space-y-4">
                                {userinfo.addresses?.map((address, index) => (
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
