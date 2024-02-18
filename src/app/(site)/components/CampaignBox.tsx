import { Button } from '@/components/ui/button'
import React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'

function CampaignBox({ campaign, setCampaign, setSheetOpen }: any) {
    return (
        <>
            <div className='hover:bg-gray-50 p-4 rounded-lg'>
                <p className='tracking-wide text-lg font-semibold'>{campaign.name}</p>
                <p className='text-xs text-gray-400'>Posted on: {format(campaign.createdAt, 'PPP')}</p>
                <p className='text-sm mt-5'>{campaign.description.substring(0, 150)}...</p>
                <Button onClick={() => {
                    setCampaign(campaign)
                    setSheetOpen(true)
                }} className='p-0 h-auto mt-2' variant={"link"}>
                    See Details
                </Button>
            </div>
            <hr />
        </>
    )
}

export default CampaignBox