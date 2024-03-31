import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
    return (
        <div className='flex justify-center items-center w-full flex-1 h-[50vh]'>
            <AiOutlineLoading3Quarters className='animate-spin' size={30} />
        </div>
    )
}

export default Loading
