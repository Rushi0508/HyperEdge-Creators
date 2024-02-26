import { InstagramLogoIcon, PlayIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

function Sidebar({ user }: any) {
    const router = useRouter()
    return (
        <div className='px-10 py-5'>
            <div>
                <p><span className='font-semibold'>City:</span> <span className='text-gray-500'>{user?.city}</span></p>
            </div>
            <div className='mt-2'>
                <p><span className='font-semibold'>Website:</span> <span className='text-blue-500 cursor-pointer hover:underline'><a target='_blank' href={'https://' + user?.website}>{user?.website}</a></span></p>
            </div>
            <div className='mt-2'>
                <p><span className='font-semibold'>Industry:</span> <span className='text-gray-500'>{user?.industry}</span></p>
            </div>
            <div className='mt-2'>
                <p className='text-lg font-semibold'>Representative Details:</p>
                <div className='flex flex-col gap-2 mt-2 ml-2'>
                    <p><span className='font-semibold'>Name:</span> <span className='text-gray-500'>{user?.personName}</span></p>
                    <p><span className='font-semibold'>Role:</span> <span className='text-gray-500'>{user?.personRole}</span></p>
                    <p><span className='font-semibold'>Email:</span> <span className='text-gray-500'>{user?.email}</span></p>
                    <p><span className='font-semibold'>Contact:</span> <span className='text-gray-500'>{user?.phoneNumber}</span></p>
                </div>
            </div>

        </div>
    )
}

export default Sidebar