import React from 'react'

function TitleBio({ user }: any) {
    return (
        <>
            <div>
                <p className='text-lg font-semibold'>Description</p>
            </div>
            <p className='mt-2'>{user?.description}</p>
        </>
    )
}

export default TitleBio