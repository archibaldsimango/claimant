import React from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import { Avatar } from '@material-ui/core';
import tatenda from '../../Images/tatenda.jpg'
import { useStateValue } from '../../StateContext/StateProvider';

function Dashboard() {
    const [{pharmacy}] = useStateValue()
    console.log(pharmacy)
    return (
        <>
            <DashboardLayout>
                <div className="dashboard__top flex flex-row mb-4">
                    <p className="text-2xl font-bold text-gray-700">Welcome {" "} {pharmacy?.name}!</p>
                    <div className="flex-1"></div>
                    <p>
                        <Calender />
                    </p>
                </div>
                <p className="text-xl font-bold mb-8 text-gray-700">Pharmacy Overview</p>

                <div className="dashboard__body flex flex-row">
                    <div className="body__left w-2/3 bg-white shadow mr-3 rounded">
                        <p className="text-left m-4 text-xl border-b border-1 border-gray-700">Active Users</p>
                        <ul>
                            <li className="flex flex-row items-center border-b py-2 border-gray-200">
                                <Avatar variant="rounded" className="ml-4" src={tatenda} />
                                <span className="ml-2">
                                    <p>Tatenda</p>
                                    <p className="text-gray-500 text-sm">Diabetic Prescription On The Go</p>
                                </span>
                            </li>
                            <li className="flex flex-row items-center border-b py-2 border-gray-200">
                                <Avatar variant="rounded" className="ml-4" src={tatenda} />
                                <span className="ml-2">
                                    <p>Tatenda</p>
                                    <p className="text-gray-500 text-sm">Diabetic Prescription On The Go</p>
                                </span>
                            </li>
                            <li className="flex flex-row items-center border-b py-2 border-gray-200">
                                <Avatar variant="rounded" className="ml-4" src={tatenda} />
                                <span className="ml-2">
                                    <p>Tatenda</p>
                                    <p className="text-gray-500 text-sm">Diabetic Prescription On The Go</p>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="body__right w-1/2 bg-white shadow ml-3 rounded">
                        <p className="text-left m-4 text-xl">Top Selling Products</p>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

//calender holder
const Calender = () => {
    return (
        <>
            <span className="flex flex-row p-2 justify-between bg-white shadow rounded">
                <p className="mr-8">{new Date().toISOString().slice(0, 10)}</p>
                <TodayOutlinedIcon className="text-gray-700" />
            </span>
        </>
    )
}

export default Dashboard
