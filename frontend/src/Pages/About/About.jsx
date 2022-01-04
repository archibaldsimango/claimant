import React from 'react'
import DesktopLayout from '../../Layout/DesktopLayout'
import logo from '../../Images/blueLogo.png'
import './About.css'
import FormatQuote from '@material-ui/icons/FormatQuote';

function About() {
    return (
        <DesktopLayout>
            <div className="min-h-screen flex flex-col pt-8 items-center">
                <div className="banner flex flex-col w-5/6 self-center mb-8 rounded-lg h-60 pt-8 pb-2 pr-2 pl-8 flex justify-between shadow-md">
                    <img src={logo} alt="logo" className="w-24 h-24" />
                    <p className="text-right font-bold text-white">"Your Wellness, Our Heartbeat"</p>
                </div>
                <div className="below__banner flex flex-row w-5/6">
                    <div className="flex flex-col w-2/3 px-2">
                        <p className="font-bold text-center mb-1 text-blue-700 text-2xl">About Us</p>
                        <p className="text-gray-700 mb-8">Claimant is a free software under the health and nutrition category which enables easy identification of pharmacies
                        within a specific radii so as to aqcuire required medication.
                        We provide a non physical interraction between patients and pharmacies so as to minimise movements
                        and wastage of time when consulting for presciptions and specific drugs.
                        We are a bridge  between the society and all the medical and drug help information patients may need.</p>
                        <p className="font-bold text-center mb-1 text-blue-700 text-2xl">Services</p>
                        <p className="text-gray-700 mb-8">For end users, Claimant is a mobile application which is compartible on both android and iOS. It enables the users
                        to search for specific drugs from different pharmacies within their location or even nation wide hence knowing
                        the drugs in store and also compare prices in different pharmacies. It also gives allowance for patients to
                        communicate with pharmacies on their prescription orders and how to take them.
                        
                        For pharmacies, Claimant has a admin inventory management dashboard, where the pharmacy can manage
                        their stock and orders from end users.
                        We ensure security of information between user and pharmacists will remain confidential at all times.
                        </p>
                        <p className="font-bold text-center mb-1 text-blue-700 text-2xl">Disclaimer</p>
                        <p className="text-gray-700 mb-8">Medical content on this platform is for informational purposes only. 
                        It is not intended to be substituted for professional medical advice, diagnosis, or treatment, please seek 
                        the advice of a physician or other qualified health personnel with any questions you may have regarding a
                        medical condition. 
                        </p>
                    </div>
                    <div className="border-r border-blue-700"></div>
                    <div className="other w-1/3 p-3">
                        <FormatQuote className="text-blue-700" fontSize="large"/>
                        <p className="text-gray-500 flex flex-col"><p>Let us be the ones who say we do not accept that a child dies every three seconds simply because 
                            he does not have the drugs you and I have. Let us be the ones to say we are not satisfied that your 
                            place of birth determines your right for life. Let us be outraged, let us be loud, let us be bold.</p> <p className="text-gray-700">--Brad Pitt</p> </p>
                            
                            <FormatQuote className="text-blue-700" fontSize="large"/>
                    </div>
                </div>
            </div>
        </DesktopLayout>
    )
}

export default About
