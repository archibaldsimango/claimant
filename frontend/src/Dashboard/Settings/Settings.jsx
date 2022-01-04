import React, { useState } from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import pharmacyPic from '../../Images/customer-service.png'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../StateContext/StateProvider';
import TuneIcon from '@material-ui/icons/Tune';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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



function Settings() {
    const classes = useStyles();
    const [{ pharmacy }] = useStateValue()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const user = localStorage.getItem('user')

    // http://localhost:5050/api/v1/pharmacy/update/:id
    const updateInfo = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("name", name)
            data.append('address', address)
            data.append('email', email)
            data.append('phonenumber', phonenumber)

            const response = await fetch(`http://localhost:5050/api/v1/pharmacy/update/${JSON.parse(user).user_id}`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    // 'Content-Type': `multipart/form-data`,
                    'Authorization': localStorage.getItem('token'),
                },
                body: data
            });
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col p-8">
                <p className="text-2xl font-bold text-gray-800 mb-8">Settings</p>
                <div className="logo flex flex-row items-center mb-4">
                    <Avatar src={pharmacyPic} className={classes.large} />
                    <div className="m-8"></div>
                    <div className="buttons flex flex-row">
                        <button className="text-blue-700 rounded p-1 shadow hover:bg-gray-200">Change</button>
                        <div className="m-3"></div>
                        <button className="text-gray-700 rounded p-1 shadow hover:bg-gray-200">Remove</button>
                    </div>
                </div>
                <div className="border-b border-gray-400 w-full mb-4 mt-4"></div>

                {/* //form for changing the pharmcy info */}
                <form onSubmit={updateInfo} className="flex flex-col">
                    <div className="names flex flex-row">
                        <div className="pharm_name flex flex-col w-5/6">
                            <label htmlFor="name" className="flex flex-row justify-between">
                                <p className="text-gray-800">Pharmacy Name</p>
                                <p className="text-sm text-gray-400">Visible To All</p>
                            </label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                className="border-2 border-gray-300 rounded bg-gray-100 p-2"
                                placeholder={`${pharmacy?.name}`} />
                        </div>
                        <div className="m-4"></div>
                        <div className="pharm_name flex flex-col w-5/6">
                            <label htmlFor="name" className="flex flex-row justify-between">
                                <p className="text-gray-800">Address</p>
                                <p className="text-sm text-gray-400">Visible To All</p>
                            </label>
                            <input
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                type="text"
                                className="border-2 border-gray-300 rounded bg-gray-100 p-2"
                                placeholder={`${pharmacy?.address}`} />
                        </div>
                    </div>
                    <div className="border-b border-gray-400 w-full mb-4 mt-4"></div>
                    <div className="names flex flex-row">
                        <div className="pharm_name flex flex-col w-5/6">
                            <label htmlFor="name" className="flex flex-row justify-between">
                                <p className="text-gray-800">Email</p>
                                <p className="text-sm text-gray-400">Visible To All</p>
                            </label>
                            <input
                                type={email}
                                onChange={e => setEmail(e.target.value)}
                                type="text"
                                className="border-2 border-gray-300 rounded bg-gray-100 p-2"
                                placeholder={`${pharmacy?.email}`} />
                        </div>
                        <div className="m-4"></div>
                        <div className="pharm_name flex flex-col w-5/6">
                            <label htmlFor="name" className="flex flex-row justify-between">
                                <p className="text-gray-800">Phone Number</p>
                                <p className="text-sm text-gray-400">Visible To All</p>
                            </label>
                            <input
                                type={phonenumber}
                                onChange={e => setPhonenumber(e.target.value)}
                                type="text"
                                className="border-2 border-gray-300 rounded bg-gray-100 p-2"
                                placeholder={`${pharmacy?.phonenumber}`} />
                        </div>
                    </div>
                    <div className="my-2"></div>
                    <button type="submit" className="text-blue-700 border border-blue-700 rounded p-2 hover:bg-blue-700 hover:text-white self-end">Update Info</button>
                </form>
                <div className="border-b border-gray-400 w-full mb-4 mt-4"></div>
                <div className="p-4 rounded bg-gray-800 text-gray-300 flex flex-row items-center">
                    <TuneIcon />
                    <span className="flex flex-col ml-2">
                        <p className="text-xl">Appearence</p>
                        <p className="text-sm text-gray-500">Change How Dashboard Appears</p>
                    </span>
                    <div className="flex-1"></div>
                    <ArrowRightAltIcon fontSize="large" />
                </div>
                <div className="my-2"></div>
                <div className="delete flex flex-row justify-between">
                    <span className="flex flex-col">
                        <p className="text-gray-700 font-bold">Delete Account</p>
                        <p className="text-sm">By Deleting account you lose all benefits</p>
                    </span>
                    <div className="flex-1"></div>
                    <div className="delte">
                        <button
                            className="text-red-400 border border-red-700 rounded p-2 hover:bg-red-400 hover:text-white">
                            Delete Account</button>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    )
}

export default Settings
