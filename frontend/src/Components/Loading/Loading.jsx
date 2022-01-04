import React from 'react'
import { GridSpinner } from './Grid'

function Loading() {
    return (
        <div className="w-5/6 flex flex-row items-center rounded px-16 py-20" style={{marginLeft:"auto", marginRight: "auto"}}>
            <GridSpinner size="100" color="#333"/>
        </div>
    )
}

export default Loading
