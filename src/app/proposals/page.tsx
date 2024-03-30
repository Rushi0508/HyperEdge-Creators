'use client'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Loading from './loading'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import CampaignSheet from '../(site)/components/CampaignSheet'

function page() {
    const [pageLoading, setPageLoading] = useState(true)
    const [proposals, setProposals] = useState<any>(null);
    const [campaign, setCampaign] = useState<any>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const fetchProposals = async () => {
        try {
            const { data } = await axios.get('/api/get-proposals');
            if (data.hasOwnProperty('proposals')) {
                setProposals(data.proposals);
            } else {
                toast.error('Something went wrong')
            }
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setPageLoading(false)
        }
    }
    useEffect(() => {
        fetchProposals()
    }, [])
    return (
        <div>
            <p className='text-2xl font-bold text-center'>Your Proposals</p>
            <div className='mt-5'>
                {
                    pageLoading ? <Loading /> :
                        proposals && proposals.length > 0 ?
                            <Accordion type='single' collapsible className='w-full'>
                                {
                                    proposals.map((proposal: any, index: any) => (
                                        <>
                                            <AccordionItem value={proposal.id} className='px-4 rounded-md hover:bg-gray-100'>
                                                <AccordionTrigger className='flex items-center'>
                                                    <div className='flex items-center gap-4'>
                                                        <p onClick={() => {
                                                            setCampaign(proposal.campaign);
                                                            setSheetOpen(true)
                                                        }} className='text-lg'>{proposal.campaign.name}</p>
                                                        <span className={`${proposal.status == "PENDING" ? "bg-yellow-200" : proposal.status == "ACCEPTED" ? "bg-green-200" : "bg-red-200"} py-1 px-3 rounded-md flex gap-1 items-center text-xs`}>
                                                            {proposal.status === "PENDING" && <FaClockRotateLeft size={12} />}
                                                            {proposal.status === "ACCEPTED" && <MdDownloadDone size={12} />}
                                                            {proposal.status === "DECLINED" && <MdOutlineCancel size={12} />}
                                                            {proposal.status}
                                                        </span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className='text-base'>
                                                    <p className='mb-2'><span className='font-semibold'>Proposed Rate:</span> $ {proposal.proposedRate}</p>
                                                    {proposal.message}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </>
                                    ))
                                }
                            </Accordion>
                            :
                            <p className='text-center text-base text-gray-600 tracking-wider'>
                                No Proposals found.
                                <p className='mt-2'>Don't worry. <Link className='hover:underline text-indigo-500' href='/'>Find Brands</Link> and make proposals</p>
                            </p>
                }
            </div>
            <CampaignSheet campaign={campaign} setSheetOpen={setSheetOpen} sheetOpen={sheetOpen} />
        </div>
    )
}

export default page
