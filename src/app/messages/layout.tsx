import React from 'react'
import Navbar from '../components/Navbar'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className='max-w-screen-2xl mx-auto'>
                {children}
            </div>
        </>
    )
}

export default layout