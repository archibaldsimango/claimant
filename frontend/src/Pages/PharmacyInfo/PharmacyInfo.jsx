import React, { useState } from 'react'
import DesktopLayout from '../../Layout/DesktopLayout'
import logo from '../../Images/blueLogo.png'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateContext/StateProvider';

function PharmacyInfo() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [website, setWebsite] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [{ user }] = useStateValue()
    const history = useHistory()

    const createPharmacy = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("name", name)
            data.append('address', address)
            data.append('website', website)
            data.append('phonenumber', phonenumber)

            const response = await fetch(`http://localhost:5050/api/v1/pharmacy/create/${JSON.parse(user).user_id}`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    // 'Content-Type': `multipart/form-data`,
                    'Authorization': localStorage.getItem('token'),
                },
                body: data
            });
            if(response.status === 409){
                setErrMsg('Pharmacy Already Exists')
            }
            else if(response.status === 400){
                setErrMsg('Enter All Fields')
            }
            else if(response.status === 403){
                setErrMsg('Not Authorised')
            }
            else if(response.status === 200){
                setErrMsg('Pharmacy Created')
                setTimeout(() => {
                    history.push('/dashboard')
                }, 1500);
            }
            console.log(errMsg)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DesktopLayout>
            <div className="infopage min-h-screen flex flex-col items-center py-8 bg-gray-100">
                <div className="flex flex-col shadow bg-white p-2 rounded p-8 w-5/6">
                    <Link to='/' className="logo flex flex-row items-center self-center">
                        <img src={logo} alt="logo" className="w-16" />
                        <p className="text-blue-800 font-bold text-xl">Claimant</p>
                    </Link>
                    <p className="text-2xl text-gray-700 font-bold self-center mt-3">Finish Account Setup</p>
                    <p className="text-gray-400 text-sm text-center my-2">Create Your Account Profile By Providing your proper pharmacy information</p>
                    <div className="border-b border-gray-300 my-4 w-full"></div>
                    {errMsg ? (<p className="bg-green-500 my-4 p-1 self-center text-center rounded w-full">{errMsg}</p>) : null}
                    <form onSubmit={createPharmacy} className="flex flex-col">
                        <div className="flex flex-row">
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                placeholder="Pharmacy Name"
                                className="bg-gray-600 p-2 outline-none rounded w-full mr-3 my-2" />
                            <input
                                value={phonenumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                type="text"
                                placeholder="Phone Number"
                                className="bg-gray-600 p-2 outline-none rounded w-full my-2" />
                        </div>
                        <input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            type="text"
                            placeholder="Physical Address"
                            className="bg-gray-600 p-2 outline-none rounded w-full my-2" />
                        <input
                            value={website}
                            onChange={e => setWebsite(e.target.value)}
                            type="text"
                            placeholder="Website If Any"
                            className="bg-gray-600 p-2 outline-none rounded w-full my-2" />
                        <button
                            type="submit"
                            className="p-2 self-center flex flex-row items-center text-center rounded bg-blue-700 hover:bg-blue-600 text-white outline-none">
                            <AddBoxIcon />
                            <p>Create Pharmacy</p>
                        </button>
                    </form>
                </div>
            </div>
        </DesktopLayout>
    )
}

export default PharmacyInfo
