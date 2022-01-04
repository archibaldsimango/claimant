import React, { useEffect, useState } from 'react'
import DesktopLayout from '../../Layout/DashboardLayout'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import axios from 'axios';

function Orders() {

    const [orders, setOrder] = useState()
    const user = localStorage.getItem('user')
    useEffect(() => {
        axios.get(`http://localhost:5050/api/v1/pharmacy/orders/${JSON.parse(user).user_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        }).then(res => {
            setOrder(res.data)
        });
    }, [user])

    console.log(orders)

    return (
        <DesktopLayout>
            <div className="flex flex-col">
                <p className="text-2xl font-bold text-gray-800 mb-4">List Of Orders</p>
                <table className="bg-white shadow rounded">
                    <thead>
                        <tr className="bg-gray-200 text-sm text-gray-400 p-4">
                            <th className="py-4">Order #</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Status</th>
                            <th>Date Created</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map(order => (
                            <tr className="text-sm text-center border-b border-gray-300 items-center" key={order._id}>
                                <td className="py-4">{order._id.substring(0, 10)}</td>
                                <td>{order.orderer_name}{" "}{order.orderer_surname}</td>
                                <td>{order.item}</td>
                                <td>
                                    {order.status === 'pending...' ? 
                                        (<p className="bg-blue-200 border border-blue-800 rounded-full">{order.status}</p>):
                                         order.status === 'paid' ? (<p className="bg-green-200 border border-green-800 rounded-full">{order.status}</p>): 
                                         (<p className="bg-red-200 border border-red-800 rounded-full">{order.status}</p>)}
                                </td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.phonenumber}</td>
                                <td>
                                    <CheckCircleOutlineRoundedIcon fontSize="small" className="bg-blue-200 rounded text-blue-700 mr-1"/>
                                    <DeleteForeverRoundedIcon fontSize="small" className="bg-red-200 rounded text-red-700 ml-1" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DesktopLayout>
    )
}

export default Orders
