import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NaturePeopleRoundedIcon from '@material-ui/icons/NaturePeopleRounded';
import logo from '../Images/blueLogo.png'
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import { useStateValue } from '../StateContext/StateProvider';
import pharmacyPic from '../Images/customer-service.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function DashboardLayout({ children }) {

    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue()

    useEffect(() => {
        const user = localStorage.getItem('user')
        const getPharmacies = async () => {
            const res = await axios.get(`http://localhost:5050/api/v1/pharmacy/${JSON.parse(user).user_id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
            if(res.data){
                dispatch({
                  type:'SET_PHARMACY',
                  pharmacy:res.data.pharmacy
                })
              }else{
                dispatch({
                  type: 'SET_PHARMACY',
                  pharmacy: null
                })
              }  
        }
        getPharmacies()
    }, [dispatch])

    const logout = (e) => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.reload(false)
      }

    return (
        <>
            {/* //this is the body */}
            <div className="flex flex-col md:flex-row top-0">
                {/* this is th sidebar */}
                <div className="min-h-screen fixed top-0 md:relative md:h-screen md:sticky z-100 shadow w-full md:w-48">
                    <div className="desktop__dropdowns bg-gray-800 top-0 min-h-screen md:w-48 content-center md:content-start text-left justify-between">
                        <ul className="list-reset flex bg-gray-800 flex-col md:flex-col py-0 text-left text-white">
                            <Link to='/' className="flex flex-row items-center text-center p-2">
                                <img src={logo} alt="logo" className="w-10" />
                                <p className="ml-4">Claimant</p>
                            </Link>
                            <Link to='/dashboard' className="mr-3 flex flex-row bg-gray-700 w-full p-1 pl-3">
                                <HomeOutlinedIcon />
                                <p className="ml-3"> Dashboard</p>
                            </Link>
                            <div className="mb-5"></div>
                            <li className="text-gray-400 p-1 pl-3 mb-1">Management</li>
                            <Link to='/patients' className="mr-3 flex flex-row hover:bg-gray-700 w-full p-1 pl-3">
                                <NaturePeopleRoundedIcon />
                                <p className="ml-3">Patients</p>
                            </Link>
                            {/* <Link to='/customers' className="mr-3 flex flex-row hover:bg-gray-700 w-full p-1 pl-3">
                                <PeopleOutlineOutlinedIcon/>
                                <p className="ml-3">Customers</p>
                            </Link> */}
                            <Link to='/orders' className="mr-3 flex flex-row hover:bg-gray-700 w-full p-1 pl-3">
                                <ShoppingCartOutlinedIcon />
                                <p className="ml-3">Orders</p>
                            </Link>
                            <Link to='/products' className="mr-3 active:bg-gray-700 flex flex-row hover:bg-gray-700 w-full p-1 pl-3">
                                <LocalOfferOutlinedIcon />
                                <p className="ml-3">Products</p>
                            </Link>
                            <Link to='/dashboard' className="mr-3 flex flex-row hover:bg-gray-700 w-full p-1 pl-3">
                                <ReceiptOutlinedIcon />
                                <p className="ml-3">Invoices</p>
                            </Link>
                            <div className="flex mb-16"></div>
                            <li className="text-gray-400 p-1 pl-3 mb-1">Configuration</li>
                            <Link to='/settings' className="mr-3 flex flex-row hover:bg-gray-700 w-full p-1 pl-3">
                                <SettingsOutlinedIcon />
                                <p className="ml-3">Settings</p>
                            </Link>
                            <span onClick={logout} className="mr-3 flex flex-row hover:bg-gray-700 w-full p-1 pl-3 cursor-pointer">
                                <ExitToAppIcon />
                                <p className="ml-3">Logout</p>
                            </span>
                        </ul>
                    </div>
                </div>

                {/* this ius where trhe rest od the app goiwes */}
                {/* this is the rest is the body */}
                <div className="main-content flex-1 flex-col">
                    <div className="body__header items-center shadow p-2 flex flex-row">
                        <MenuOutlinedIcon />
                        <div className="flex-1"></div>
                        <Link to='/notifications'>
                            <NotificationsNoneOutlinedIcon className="mr-4" />
                        </Link>
                        <Link to='/settings'>
                            <SettingsOutlinedIcon className="mr-4" />
                        </Link>
                        <Avatar className="mr-3" fontSize="small" src={pharmacyPic} />
                    </div>
                    <div className="the__body bg-gray-100 min-h-screen p-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardLayout
