import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'

function NotiBox({ fetchData, collaboration, setCampaign, setSheetOpen }: any) {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const handleStatus = async (status: string) => {
        setLoading(true);
        const { data } = await axios.post('/api/notifications', {
            campaignId: collaboration.campaign.id,
            collaborationId: collaboration.id,
            status: status
        })

        if (data.hasOwnProperty('success')) {
            toast({
                title: "Action Completed",
                description: "You can view your work if any updates"
            })
            setLoading(false)
            fetchData()
        }
    }

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
                        <AvatarFallback>{collaboration.campaign.brand.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <Link href={`/brand/${collaboration.campaign.brand.id}`} className='hover:underline text-sm font-bold'>{collaboration.campaign.brand.name}</Link>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <button disabled={loading} onClick={() => handleStatus("APPROVED")} className="cursor-pointer flex justify-center items-center gap-1 focus:bg-green-500 focus:text-white outline-none bg-transparent text-sm hover:bg-green-500 text-green-700  hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded">
                        Accept
                    </button>
                    <button disabled={loading} onClick={() => handleStatus("DECLINED")} className="cursor-pointer flex justify-center items-center gap-1 focus:bg-red-500 focus:text-white outline-none bg-transparent text-sm hover:bg-red-500 text-red-700  hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotiBox