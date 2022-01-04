import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import logo from '../../Images/blueLogo.png'
import { Link, useHistory } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

//component for map
const Map = () => {
    const [pharmacies, setPharmacies] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:5050/api/v1/pharmacy/all")
            .then(function (response) {
                setPharmacies(response.data.pharmacies)
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(true)
    }, [])

    console.log(pharmacies)
    const [viewport, setViewport] = React.useState({
        width: "90%",
        height: "80vh",
        latitude: -18.0067919,
        longitude: 31.0558819,
        zoom: 12
    });

    return (
        <>
            {loading === true ? (<ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(viewport) => setViewport(viewport)}
                mapboxApiAccessToken='pk.eyJ1IjoidGF0ZW5kYXp3IiwiYSI6ImNrY2w0dGJheDIwbGUydG84azg0bWNvNmEifQ.ca6uTtMo0oH914jZNuMWjg'
            >
                {pharmacies?.map(pharmacy => (
                    <Marker latitude={pharmacy.latitude} longitude={pharmacy.longitude} key={pharmacy._id}>
                        <div className="text-red-700">
                            <p className="text-xs bg-red-700 text-white rounded p-1">{pharmacy.name}</p>
                            <LocationOnRoundedIcon />
                        </div>
                    </Marker>
                ))}
            </ReactMapGL>) : (<Loading />)}
        </>
    );
}

function Pharmacies() {
    const [pharmacies, setPharmacies] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:5050/api/v1/pharmacy/all")
            .then(function (response) {
                setPharmacies(response.data.pharmacies)
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(false)
    }, [])

    return (
        <>
            {/* //this is the body */}
            <div className="flex flex-col md:flex-row top-0">
                {/* this is th sidebar */}
                <div className="min-h-screen fixed top-0 md:relative md:h-screen md:sticky z-100 shadow w-full md:w-60">
                    <div className="desktop__dropdowns bg-gray-800 top-0 min-h-screen md:w-60 content-center md:content-start text-left justify-between">
                        <ul className="list-reset flex bg-gray-800 mx-2 flex-col md:flex-col items-center text-left text-white">
                            <Link to='/' className="flex flex-row items-center text-center p-2">
                                <img src={logo} alt="logo" className="w-10" />
                                <p className="ml-4">Claimant</p>
                            </Link>
                            <Link to='/' className="flex flex-row items-center text-gray-700">
                                <KeyboardBackspaceIcon fontSize="small" />
                                <p className="text-xs">Back to shopping</p>
                            </Link>
                            <div className="border-b border-gray-600 w-5/6 my-4"></div>
                            <div className="bg-gray-600 p-2 w-full mb-2 rounded-sm text-gray-400 flex flex-row items-center">
                                <SearchRoundedIcon />
                                <input type="text" placeholder="Search " className="bg-transparent outline-none" />
                            </div>
                            <p className="text-gray-500 py-1">Available Pharmacies</p>
                            {pharmacies?.map(pharmacy => (
                                <PharmacyLink 
                                    key={pharmacy._id} 
                                    name={pharmacy.name} 
                                    id={pharmacy._id} 
                                    address={pharmacy.address}
                                    phonenumber={pharmacy.phonenumber}
                                    logos={pharmacy.logos}
                                    email={pharmacy.email}
                                />
                                ))}

                        </ul>
                    </div>
                </div>

                {/* this ius where trhe rest od the app goiwes */}
                {/* this is the rest is the body */}
                <div className="main-content flex-1 flex-col items-center">
                    <div className="body__header items-center shadow p-2 flex flex-col p-2">
                        <p className="text-center font-bold text-gray-700">Search for drug and we will show you the nearest pharmacy with the drug</p>
                    </div>
                    <div className="the__body bg-gray-100 min-h-screen p-4" id="mad_id">
                        {loading === false ? (<Map />) : (<Loading />)}
                    </div>
                </div>
            </div>
        </>
    )
}

const PharmacyLink = ({name, id, address, phonenumber, logos, email}) => {
    const history = useHistory()

    const pharmInfo = {
        id: id,
        name: name,
        address: address,
        phonenumber: phonenumber,
        logos: logos,
        email: email
    }

    const setPharmacy = (e) => {
        e.preventDefault()
        localStorage.setItem('pharmInfo', JSON.stringify(pharmInfo))
        history.push('/pharmacy')
    }

    return (
        <span onClick={setPharmacy} className="text-gray-300 py-1 cursor-pointer hover:text-gray-500">{name}</span>
    )
}

export default Pharmacies
