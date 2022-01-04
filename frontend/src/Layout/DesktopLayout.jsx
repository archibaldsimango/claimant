import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'

function DesktopLayout({children}) {
    return (
        <div>
            <div className="header sticky top-0 z-100">
                <Navbar/>
            </div>
            <div className="pb-8">
                {children}
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}

export default DesktopLayout
