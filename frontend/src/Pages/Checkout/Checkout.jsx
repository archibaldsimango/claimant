import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ecocash from '../../Images/ecocash.png'
import onemoney from '../../Images/onemoney.png'
import paypal from '../../Images/paypal.png'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { useStateValue } from '../../StateContext/StateProvider';
import { getBasketTotal } from '../../StateContext/reducer';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

function Checkout() {

    const [{ basket }] = useStateValue()
    // console.log(basket)
    return (
        <div>
            <Navbar />
            <div className="flex justify-between p-4 flex-col md:flex-row">
                <div className="checkout__left md:w-2/3 w-full mr-4 my-4">
                    <Link to='/' className="flex flex-row items-center text-gray-400 mb-4">
                        <KeyboardBackspaceIcon />
                        <p>Continue Shopping</p>
                    </Link>
                    <div className="border-b border-gray-300 w-full"></div>
                    <div className="flex flex-row justify-between mb-14">
                        <span className="flex-col">
                            <p className="text-gray-600 font-bold">Shopping Cart</p>
                            <p className="text-gray-500 text-sm">You Have {basket?.length} items in your cart</p>
                        </span>
                        <p className="text-sm font-bold text-gray-600">By Time:</p>
                    </div>
                    <div className="w-full">
                        {basket.map(item => (
                            <CheckoutItem
                                picture={item.picture}
                                price={item.price}
                                name={item.name}
                                category={item.category}
                                id={item.id}
                                owner={item.owner}
                            />
                        ))}
                    </div>
                </div>
                <div className="checkout__right flex flex-col bg-blue-700 p-4 rounded-lg md:w-1/3 w-full">
                    <span className="flex flex-row justify-between">
                        <p className="text-gray-100  font-bold">Card Details</p>
                        <Avatar />
                    </span>
                    <div className="flex flex-col mb-4">
                        <p className="text-sm text-white mb-2">Pay With</p>
                        <div className="flex flex-row items-center justify-between">
                            <div className="rounded">
                                <img src={ecocash} alt="ecocash" className="w-24 rounded" />
                            </div>
                            <div className="rounded">
                                <img src={onemoney} alt="onemoney" className="w-16" />
                            </div>
                            <div className="rounded">
                                <img src={paypal} alt="paypal" className="w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-8"></div>
                    <input type="text" placeholder="Phone Number" className="bg-blue-500 outline-none text-white rounded p-2 placeholder-blue-700 mb-4" />
                    <input type="text" placeholder="CVV" className="bg-blue-500 outline-none text-white rounded p-2 placeholder-blue-700" />
                    <div className="border-b border-blue-500 my-8"></div>
                    <span className="text-white justify-between flex flex-row items-center">
                        <p>Subtotal</p>
                        <p>${getBasketTotal(basket)}</p>
                    </span>
                    <span className="text-white justify-between flex flex-row items-center">
                        <p>Delivery</p>
                        <p>$000.00</p>
                    </span>
                    <div className="m-4"></div>
                    <div className="div flex flex-row justify-bewteen">
                        <button className="flex flex-row p-2 justify-between bg-blue-500 rounded w-5/6 text-white self-center hover:bg-blue-400">
                            <p>${getBasketTotal(basket)}</p>
                            <span className="flex flex-row items-center">
                                <p>Proceed</p>
                                <ArrowForwardOutlinedIcon />
                            </span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

const CheckoutItem = ({ picture, price, name, category, id, owner }) => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue()
    const [order, setOrder] = useState()
    const removeFromCart = (e) => {
        e.preventDefault()
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    const placeOrder = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5050/api/v1/order/add/${id}`,{to: owner},{
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        }).then(res => {
            setOrder(res)
        });
        console.log(order)
    }

    return (
        <div className="shadow p-2 rounded flex mb-4 flex-row items-center w-full md:w-full">
            <Avatar variant="rounded" src={picture} className={classes.large} />
            <div className="w-2/6"></div>
            <div className="flex md:flex-row flex-col items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-gray-600 font-bold">{name}</p>
                    <p className="text-sm text-gray-500">{category}</p>
                </div>
                <div className="w-3"></div>
                <div className="input">
                    <input type="Number" placeholder="1" className="border-2 w-16 border-gray-300 rounded" />
                </div>
                <div className="flex-1"></div>
                <p className="font-bold">${price}</p>
                <div className="mr-4"></div>
            </div>
            <div className="flex-1"></div>
            <button onClick={placeOrder} className="flex flex-row p-2 ml-2 justify-between bg-red-500 rounded text-white self-center hover:bg-red-400">
                <span className="flex flex-row items-center">
                    <p>Order</p>
                    <ListAltRoundedIcon />
                </span>
            </button>
            <span className="text-red-700 hover:text-red-500 cursor-pointer" onClick={removeFromCart}>
                <DeleteForeverOutlinedIcon />
            </span>
        </div>
    )
}

export default Checkout
