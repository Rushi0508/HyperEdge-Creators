'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Loading from './loading'
import toast from 'react-hot-toast'
import Link from 'next/link'

function page() {
    const [status, setStatus] = useState("ACTIVE")
    const [campaigns, setCampaigns] = useState<any>(null)
    const [dataLoading, setDataLoading] = useState(false)
    const fetchCampaigns = async () => {
        try {
            setDataLoading(true)
            const { data } = await axios.get(`/api/campaigns?status=${status}`)

            if (data.hasOwnProperty('success')) {
                setCampaigns(data.campaigns);
            } else {
                toast.error("Can't load campaigns")
            }
        } catch (e) {
            toast.error("Can't load campaigns")
        } finally {
            setDataLoading(false)
        }
    }
    useEffect(() => {
        fetchCampaigns()
    }, [status])
    return (
        <>
            <p className='text-2xl font-semibold text-center mb-4'>My Work</p>
            <Tabs onValueChange={(value) => setStatus(value)} defaultValue="ACTIVE" className='w-full flex flex-col'>
                <TabsList className='py-6 px-2 m-auto'>
                    <TabsTrigger className='py-2' value="ACTIVE">Active Campaigns</TabsTrigger>
                    <TabsTrigger className='py-2' value="PLANNED">Planned Campaigns</TabsTrigger>
                    <TabsTrigger className='py-2' value="COMPLETED">Completed Campaigns</TabsTrigger>
                </TabsList>
                <TabsContent value={status} className='w-5/6 mx-auto mt-4'>
                    {
                        dataLoading ? <Loading /> :
                            !campaigns?.length ? `No ${status} campaigns` :
                                campaigns?.map((campaign: any, index: any) => (
                                    <>
                                        <div className='hover:bg-gray-50 p-4 rounded-lg'>
                                            <p className='tracking-wide text-lg font-semibold'>{campaign.name}</p>
                                            <p className='text-xs text-gray-400'>Posted on: {format(campaign.createdAt, 'PPP')}</p>
                                            <p className='text-sm mt-5'>{campaign.description.substring(0, 150)}...</p>
                                            <Button asChild className='p-0 h-auto mt-2' variant={"link"}>
                                                <Link href={`/campaign/${campaign.id}`}>See Activity</Link>
                                            </Button>
                                        </div>
                                        <hr />
                                    </>
                                ))
                    }
                </TabsContent>
            </Tabs>
        </>
    )
}

export default page