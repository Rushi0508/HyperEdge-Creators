import { timeAgo } from "@/app/actions/timeAgo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import { format } from "date-fns"
import Link from "next/link"
import { BsCalendarDate } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'
import { MdOutlineCategory } from 'react-icons/md'
import { FaRegEnvelopeOpen } from 'react-icons/fa'
import { useEffect, useState } from "react"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getSession from "@/app/actions/getSession"
import axios from "axios"
import { ProposalDialog } from "./ProposalDialog"

function CampaignSheet({ campaign, setCampaign, setSheetOpen, sheetOpen }: any) {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState<any>(null)
    const [openProposal, setOpenProposal] = useState(false)

    const fetchDetails = async () => {
        const { data } = await axios.post('/api/check-apply', { campaignId: campaign?.id });
        if (data.hasOwnProperty('collaboration')) {
            if (data.collaboration.status == "PENDING") {
                setMessage("You are already being invited to the campaign. Check notifications");
            } else if (data.collaboration.status == "APPROVED") {
                setMessage("You are already added to the campaign. See your work")
            }
        }
        else if (data.hasOwnProperty('proposal')) {
            setMessage("You have already made a proposal for this campaign")
        }
    }
    useEffect(() => {
        fetchDetails()
    }, [])
    return (
        <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen(false)}>
            <SheetContent side={"left"} className="sm:max-w-[1000px] overflow-auto no-scrollbar">
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold">{campaign?.name}</SheetTitle>
                    <SheetDescription className="text-gray-500 text-sm">Posted {timeAgo(campaign?.createdAt)}</SheetDescription>
                </SheetHeader>
                <div className="flex gap-2 items-center my-4">
                    <div className="flex gap-2 items-center">
                        <Avatar className="w-8 h-8">
                            <AvatarImage className="overflow-visible object-cover" src={campaign?.brand.logo} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Link href='/' className="font-bold cursor-pointer hover:underline">{campaign?.brand.name}</Link>
                    </div>
                </div>
                <hr className="my-6" />
                <p>{campaign?.description}</p>
                <hr className="my-6" />
                <div className="flex items-center gap-10 my-6">
                    <div className="flex items-center gap-3">
                        <BsCalendarDate size={20} />
                        <p className="font-semibold">Start Date: <span className="font-medium">{campaign && format(campaign.startDate, 'PPP')}</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                        <BsCalendarDate size={20} />
                        <p className="font-semibold">End Date: <span className="font-medium">{campaign && format(campaign.endDate, 'PPP')}</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-10 my-6">
                    <div className="flex items-center gap-5">
                        <FaTags size={20} />
                        <p className="font-semibold">$ {campaign?.feesFrom} - $ {campaign?.feesTo} / {campaign?.type.slice(4)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-10 my-6">
                    <div className="flex items-center gap-3">
                        <MdOutlineCategory size={20} />
                        <p className="flex items-center gap-2"><span className="font-bold">Target Categories:</span>
                            {
                                campaign?.targetCategory.length > 0 ?
                                    campaign?.targetCategory.map((c: string) => (
                                        <span className="text-black text-sm bg-gray-100 rounded-full px-3 py-1">{c}</span>
                                    )) :
                                    <span>All</span>
                            }
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-10 my-6">
                    {
                        message ? <p className="bg-green-600 px-4 py-2 rounded-md text-white">{message}</p> :
                            <Button onClick={() => setOpenProposal(true)} size={"lg"} className="flex gap-2 px-4 cursor-pointer" asChild>
                                <div>
                                    <FaRegEnvelopeOpen size={20} />
                                    Send Proposal
                                </div>
                            </Button>
                    }
                    <ProposalDialog fetchDetails={fetchDetails} setOpenProposal={setOpenProposal} openProposal={openProposal} campaignId={campaign?.id} />
                </div>
            </SheetContent>
        </Sheet >
    )
}

export default CampaignSheet