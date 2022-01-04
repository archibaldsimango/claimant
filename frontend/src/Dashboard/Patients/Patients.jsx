import React from 'react'
import DashboardLayout from '../../Layout/DashboardLayout'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

function Patients() {
    return (
        <DashboardLayout>
            <div className="flex flex-col shadow bg-white rounded">
                <div className="flex flex-row p-4">
                    <div className="search border-2 border-gray-200 rounded p-2 flex flex-row w-1/3">
                        <SearchRoundedIcon className="text-gray-400" fontSize="small"/>
                        <input type="text" placeholder="Search For Patient" className="outline-none bg-transparent" />
                    </div>
                    <div className="flex-1"></div>
                    <span className="flex items-center flex-row bg-blue-700 text-white rounded p-2 cursor-pointer">
                        <AddBoxRoundedIcon />
                        <p>Add New Patient</p>
                    </span>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Patients
