import { InstagramLogoIcon, PlayIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import React from 'react'

function Sidebar({ user }: any) {
    return (
        <div className='px-10 py-5'>
            <div>
                <p><span className='font-semibold'>Email:</span> <span className='text-gray-500'>{user?.email}</span></p>
            </div>
            <div className='mt-4'>
                <p><span className='font-semibold'>Username:</span> <span className='text-gray-500'>{user?.username}</span></p>
                <div className='mt-4'>
                    <p><span className='font-semibold'>City:</span> <span className='text-gray-500'>{user?.city}</span></p>
                </div>
            </div>
            <div className='mt-4'>
                <p className='font-semibold'>Social Accounts</p>
                <div className='flex items-center gap-2'>
                    <InstagramLogoIcon className='w-6 h-6' />
                    <TwitterLogoIcon className='w-6 h-6' />
                </div>
            </div>
            <div className='flex flex-col gap-1 mt-4'>
                <div>
                    <p className='font-semibold'>Content Categories</p>
                    {(user?.categories).map((c: string) => (
                        <li className='text-gray-500 list-disc'>{c}</li>
                    ))}
                </div>
                <div>
                    <p className='font-semibold'>Sub Categories</p>
                    {(user?.subCategories).map((c: string) => (
                        <li className='text-gray-500 list-disc'>{c}</li>
                    ))}
                </div>
            </div>
            <div className='mt-4'>
                <p className='font-semibold'>Languages Spoken</p>
                {(user?.languagesSpoken).map((c: string) => (
                    <li className='text-gray-500 list-disc'>{c}</li>
                ))}
            </div>
        </div>
    )
}

export default Sidebar