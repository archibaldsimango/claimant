import React, { useEffect, useState } from 'react'
import DesktopLayout from '../../Layout/DesktopLayout'

function PharmacyCatalogue() {
    const [pharmacy, setPhamarcy] = useState()

    useEffect(()=>{
        const pharmacy = localStorage.getItem('pharmInfo')
        setPhamarcy(pharmacy)
    },[])

    return (
        <DesktopLayout>
            <div className="flex flex-col items-center">
                <div className="heading flex flex-row min-h-screen">
                    <div className="left py-4 px-8">
                        <p className="text-2xl text-gray-700 mb-3">{JSON.parse(pharmacy).name}</p>
                        <p className="text-2xl text-gray-700 font-bold mb-3">{JSON.parse(pharmacy).address}</p>
                        <p className="text-sm text-gray-700">{JSON.parse(pharmacy).email}</p>
                        <p className="text-sm text-gray-700">{JSON.parse(pharmacy).phonenumber}</p>
                        <button className="bg-gray-800 p-2 text-white">Shop Now</button>
                    </div>
                    <div className="right"> picture.. logo</div>
                </div>
            </div>
        </DesktopLayout>
    )
}

export default PharmacyCatalogue
