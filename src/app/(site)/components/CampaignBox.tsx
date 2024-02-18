import { Button } from '@/components/ui/button'
import React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

function CampaignBox({ campaign }: any) {
    return (
        <>
            <div className='hover:bg-gray-50 p-4 rounded-lg'>
                <p className='tracking-wide text-lg font-semibold'>{campaign.name}</p>
                <p className='text-xs text-gray-400'>Posted on: {format(campaign.createdAt, 'PPP')}</p>
                <p className='text-sm mt-5'>{campaign.description.substring(0, 150)}...</p>
                <Button asChild className='p-0 h-auto mt-2' variant={"link"}>
                    <Link href={`/campaign/${campaign.id}`}>See Details</Link>
                </Button>
            </div>
            <hr />
        </>
    )
}

export default CampaignBox