import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'
import React from 'react'

function NotiBox({ collaboration, setCampaign, setSheetOpen }: any) {
    return (
        <div>
            <hr className='my-2' />
            <div className='px-4'>
                <p onClick={() => {
                    setCampaign(collaboration.campaign)
                    setSheetOpen(true);
                }} className='cursor-pointer hover:underline font-semibold'>{collaboration.campaign.name}</p>
                <div className='flex my-2 items-center'>
                    <p>Brand: </p>
                    <Avatar className='overflow-visible'>
                        <AvatarImage className='mt-2 h-6 overflow-visible object-cover' src={collaboration.campaign.brand.logo}></AvatarImage>
                        <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <Link href={`/brand/${collaboration.campaign.brand.id}`} className='hover:underline text-sm font-bold'>{collaboration.campaign.brand.name}</Link>
                </div>
                <div className='flex gap-4'>
                    <button className="bg-transparent text-sm hover:bg-green-500 text-green-700  hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded">
                        Accept
                    </button>
                    <button className="bg-transparent text-sm hover:bg-red-500 text-red-700  hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotiBox