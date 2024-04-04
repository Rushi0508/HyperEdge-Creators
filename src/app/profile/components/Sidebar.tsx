import { FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";
import React from 'react'
import Link from "next/link";

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
                {
                    user.socialIds ?
                        <div className='flex items-center gap-2'>
                            {user.socialIds.instagram && <Link target="_blank" href={user.socialIds.instagram}><FaInstagram className="cursor-pointer" size={30} /></Link>}
                            {user.socialIds.youtube && <Link target="_blank" href={user.socialIds.youtube}><FaYoutube className="cursor-pointer" size={30} /></Link>}
                            {user.socialIds.twitter && <Link target="_blank" href={user.socialIds.twitter}><RiTwitterXLine className="cursor-pointer" size={28} /></Link>}
                            {user.socialIds.facebook && <Link target="_blank" href={user.socialIds.facebook}><CiFacebook className="cursor-pointer" size={30} /></Link>}
                        </div> :
                        <p className='text-gray-500'>No accounts added</p>
                }
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