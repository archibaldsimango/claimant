import React from 'react'
import DesktopLayout from '../../Layout/DesktopLayout'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CategoryIcon from '@material-ui/icons/Category';
import { useStateValue } from '../../StateContext/StateProvider';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';

function ProductDescription() {
    const desc = localStorage.getItem('desc')

    const [{ }, dispatch] = useStateValue()
    const addToBasket = (e) => {
        e.preventDefault()
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: JSON.parse(desc).id,
                name: JSON.parse(desc).name,
                description: JSON.parse(desc).description,
                price: JSON.parse(desc).price,
                picture: JSON.parse(desc).picture,
                owner: JSON.parse(desc).owner,
                discount: JSON.parse(desc).discount,
                category: JSON.parse(desc).category
            }
        })
    }

    return (
        <DesktopLayout>
            <div className="min-h-screen flex flex-row p-8">
                <div className="left flex flex-col w-1/2">
                    <Link to='/' className="flex flex-row items-center text-gray-400 mb-4">
                        <KeyboardBackspaceIcon />
                        <p>Continue Shopping</p>
                    </Link>
                    <div className="border-b border-gray-300 w-full my-4"></div>
                    <img src={JSON.parse(desc).picture} alt="description_picture" className="self-center" />
                </div>
                <div className="w-1/2 flex flex-col px-4">
                    <p className="text-2xl text-gray-800">{JSON.parse(desc).name}</p>
                    <div className="mb-3"></div>
                    <div className="categories flex flex-row">
                        <p className="bg-gray-200 rounded p-1 text-xs">{JSON.parse(desc).category}</p>
                        <div className="flex-1"></div>
                    </div>
                    <div className="border-b border-gray-300 w-full my-4"></div>
                    <div className="flex flex-row items-center mb-2">
                        <p className="text-blue-700 font-bold text-xl">${" "}{JSON.parse(desc).price}</p>
                        <div className="mr-3"></div>
                        <p className="text-gray-700 text-xs">Discount Price is {" "}${" "}{JSON.parse(desc).discount}</p>
                    </div>
                    <span className="mb-3">
                        <p className="font-bold text-xs text-gray-500">Description: {" "}</p>
                        <p className="text-xs text-gray-700 text-left">{" "}{JSON.parse(desc).description}</p>
                    </span>
                    <div className="flex flex-row justify-between px-3">
                        <input type="number" className="outline-none w-16 border border-gray-500 rounded" placeholder="QTY" />
                        <div className="flex flex-col">
                            <p className="text-gray-400 uppercase text-sm">Total Price</p>
                            <p className="text-gray-700 font-bold">${" "}{JSON.parse(desc).price}</p>
                        </div>
                        <button onClick={addToBasket} className="text-white bg-blue-700 rounded outline-none px-1">Add To Cart</button>
                    </div>
                    <div className="border-b border-gray-300 w-full my-4"></div>
                    <div className="flex flex-col p-1">
                        <p className="text-gray-700 font-bold">Precautions & Dosage</p>
                        <p className="text-sm">{JSON.parse(desc).precautions}</p>
                        <p className="text-sm">{JSON.parse(desc).dosage}</p>
                    </div>
                    <div className="border-b border-gray-300 w-full my-4"></div>
                    <div className="flex items-center flex-row p-4 bg-gray-200 rounded shadow">
                        <CategoryIcon className="text-blue-700 mr-3" fontSize="large" />
                        <div className="flex flex-col">
                            <p className="font-bold text-gray-600">Other Categories</p>
                            <p className="text-sm">View Realated Categories</p>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex flex-row items-center text-yellow-500">
                            <p>more</p>
                            <ArrowRightAltIcon />
                        </div>
                    </div>
                </div>
            </div>
        </DesktopLayout>
    )
}

export default ProductDescription
