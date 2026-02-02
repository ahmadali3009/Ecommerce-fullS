import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllProducts, fetchallproductscategoriesaync, selectAllcategories, selectAllbrand, fetchbrandsaync, fetchcategoriesaync } from "../../productsList/prodectSlice"

const sortOptions = [
    { name: "Best Rating", sort: "-rating", current: false },
    { name: "Price: Low to High", sort: "price", current: false },
    { name: "Price: High to Low", sort: "-price", current: false },
];


// const pagenation = [
//     { name: "", page: "", per_page: "10" }
// ]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Adminproductlist = () => {
    const products = useSelector(selectAllProducts);
    const brand = useSelector(selectAllbrand);
    const categories = useSelector(selectAllcategories);
    console.log("useseletorhookbrand", brand)
    const filters = [
        {
            id: 'brand',
            name: 'brand',
            options: brand,
        },


        {
            id: 'category',
            name: 'category',
            options: categories,
        },
    ]
    var limit = 10;
    var total_product = 40;
    const dispatch = useDispatch();

    let [filter, setfilter] = useState({})
    let [Sort, setSort] = useState({})
    let [pagee, setpage] = useState(1)

    const filterhandler = (e, section, option) => {
        console.log(e.target.checked)
        const newFilter = { ...filter };
        // TODO : on server it will support multiple categories
        if (e.target.checked) {
            if (newFilter[section.id]) {
                newFilter[section.id].push(option.value)
            } else {
                newFilter[section.id] = [option.value]
            }
        } else {
            const index = newFilter[section.id].findIndex(el => el === option.value)
            newFilter[section.id].splice(index, 1);
        }
        console.log("productlist--filter", newFilter);

        setfilter(newFilter);
    };
    const sorthandler = (e, option) => {
        const sort = { _sort: option.sort };
        setSort(sort);
    };

    const pagenationhandler = (e, index) => {
        setpage(index);
    };
    // const sorthandler = (e, option)=>
    //     {
    //         console.log("option", option)
    //         const newfilter = { ...filter, _sort: option.sort, _order: option.order };
    //         setfilter(newfilter)
    //         dispatch(fetchallproductscategoriesaync(newfilter))
    //     }

    useEffect(() => {
        const pagenation = { _page: pagee, per_page: limit };
        dispatch(fetchallproductscategoriesaync({ filter, Sort, pagenation }))
    }, [dispatch, filter, Sort, pagee])

    useEffect(() => {
        dispatch(fetchbrandsaync())
        dispatch(fetchcategoriesaync())
    }, [])

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (

        <>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>


                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        // onClick={(e)=>{console.log(e.target.value)}}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </DisclosurePanel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <MenuItem key={option.name}>
                                                    {({ focus }) => (
                                                        <p
                                                            onClick={(e) => sorthandler(e, option)}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                focus ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm',
                                                            )}
                                                        >
                                                            {option.name}
                                                        </p>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>

                                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>


                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        onChange={e => filterhandler(e, section, option)}
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </DisclosurePanel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3">

                                    <div className="bg-white">
                                        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                                            <Link to="/admin/addproduct">
                                                <button className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-stone-600 px-8 py-3 text-base font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2'>ADD New Product</button>
                                            </Link>                                              
                                            <Link to="/admin/dashboard">  <button className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-stone-600 px-8 py-3 text-base font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2'>Dashboard Analytic</button></Link>

                                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                                                {products.map((product) => (
                                                    <div key={product.id}>
                                                        <Link to={`/admin/adminproductdetail/${product.id}`}>
                                                            <div className=" group relative border-solid border-2 p-2 border-gray-200">
                                                                <div className="min-h60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                                                    <img
                                                                        src={product.thumbnail}
                                                                        alt={product.imageAlt}
                                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                                    />
                                                                </div>
                                                                <div className="mt-4 flex justify-between">
                                                                    <div>
                                                                        <h3 className="text-sm text-gray-700">
                                                                            <a href={product.thumbnail}>
                                                                                <span aria-hidden="true" className="absolute inset-0" />
                                                                                {product.title}
                                                                            </a>
                                                                        </h3>
                                                                        <StarIcon className='w-6 h-6 inline'></StarIcon>
                                                                        <span className='align-bottom text-sm text-gray-500'>{product.rating}</span>

                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm block font-medium text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                                                                        <p className="text-sm line-through block font-medium text-gray-400 ">${product.price}</p>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <button className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-stone-600 px-8 py-3 text-base font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2'>Edit</button>

                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Pagination */}
                                    <div className="flex items-center justify-center mt-8">
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                            <button
                                                onClick={() => pagenationhandler(null, pagee - 1)}
                                                disabled={pagee <= 1}
                                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                            >
                                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>

                                            {Array.from({ length: Math.ceil(total_product / limit) }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={(e) => pagenationhandler(e, index + 1)}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                        pagee === index + 1
                                                            ? 'bg-stone-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600'
                                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => pagenationhandler(null, pagee + 1)}
                                                disabled={pagee >= Math.ceil(total_product / limit)}
                                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                            >
                                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </nav>
                                    </div>

                                    {/* Mobile Pagination */}
                                    <div className="flex flex-1 sm:hidden justify-between mt-4">
                                        <button
                                            onClick={() => pagenationhandler(null, pagee - 1)}
                                            disabled={pagee <= 1}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-stone-50 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => pagenationhandler(null, pagee + 1)}
                                            disabled={pagee >= Math.ceil(total_product / limit)}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-stone-50 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Adminproductlist
