import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios'
import PharmacyInfo from '../Pages/PharmacyInfo/PharmacyInfo'

function PharmacyRoute({ component: Component, ...rest }) {
    const user = localStorage.getItem('user')
    const [pharmacy, setPharmacy] = useState(false)
    
    axios.get('http://localhost:5050/api/v1/pharmacy/all').then(res => {
        let foundPharmacy = res.data.pharmacies.find(pharm => pharm?.email === JSON.parse(user)?.email)
        if (foundPharmacy) {
            setPharmacy(true)
        } else {
            setPharmacy(false)
        }
    });

    // console.log(pharmacy)

    return (
        <>
            {pharmacy === true ? (<Route {...rest} render={(props) => (
                user && JSON.parse(user).role === 'pharmacy' ? (<Component {...props} />)
                    : (<Redirect to='/' />)
            )} />) : (<Route {...rest} render={(props) => (
                user && JSON.parse(user).role === 'pharmacy' ? (<PharmacyInfo />)
                    : (<Redirect to='/' />)
            )} />)}
        </>
    )
}

export default PharmacyRoute
