import React from 'react'
import blueLogo from '../../Images/blueLogo.png'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import CopyrightOutlinedIcon from '@material-ui/icons/CopyrightOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import download from '../../Images/download.png'
import { Link } from 'react-router-dom';

//footer conrtainer
function Footer() {
    return (
        <div className="flex flex-col bg-gray-800 flex flex-col md:flex-col">
            <div className="flex flex-row justify-between p-16 items-center flex-col md:flex-row">
                <Link to='/' className="logo flex flex-row items-center hover:text-gray-500">
                    <img src={blueLogo} alt="logo" className="w-16" />
                    <p className="text-gray-100 font-bold">Claimant</p>
                </Link>
                <div className="flex flex-col text-gray-100">
                    <p>Categories</p>
                    <p>Pharmacies</p>
                    <p>Other Products</p>
                </div>
                <div className="flex flex-col text-gray-100">
                    <p>Help Center</p>
                    <p>Security</p>
                    <Link to='/about' className="hover:text-gray-300">About</Link>
                </div>
                <div className="border-r border-gray-500 h-36 md:block hidden"></div>
                <div className="border-b border-white my-4 h-full md:hidden block"></div>
                <div className="flex flex-col text-gray-100">
                    <span className="bg-gray-900 px-2 outline-none rounded flex flex-row items-center">
                        <input type="text" className="bg-transparent outline-none p-2" placeholder="Email Us"/>
                        <SendOutlinedIcon fontSize="small"/>
                    </span>
                    <img src={download} alt="download" className="w-48"/>
                </div>
                
            </div>

            <div className="bg-gray-900 p-3 items-center flex flex-row px-8">
                <div className="flex flex-row items-center text-gray-400">
                    <CopyrightOutlinedIcon fontSize="small"/>
                    <p className="text-xs">Claimant Software.Inc 2021</p>
                </div>
                <div className="flex-1"></div>
                <div className="flex flex-row text-gray-400">
                    <FacebookIcon className="mr-4" fontSize="small"/>
                    <TwitterIcon className="mr-4" fontSize="small"/>
                    <InstagramIcon className="mr-4" fontSize="small"/>
                </div>
            </div>
        </div>
    )
}

export default Footer
