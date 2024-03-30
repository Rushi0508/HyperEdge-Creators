import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import React, { useEffect, useState } from 'react'
import NotiBox from "./NotiBox";
import axios from "axios";
import CampaignSheet from "../(site)/components/CampaignSheet";

function NotificationSheet({ setNotiScreen, notiScreen, setNotiIndicator }: any) {
    const [collaborations, setCollaborations] = useState<any>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const fetchData = async () => {
        const { data } = await axios.get('/api/notifications');
        if (data.hasOwnProperty('success')) {
            setCollaborations(data.collaborations);
            if (data.collaborations && data.collaborations.length > 0) {
                setNotiIndicator(true)
            } else {
                setNotiIndicator(false)
            }
        }
        setDataLoading(false)
    }
    useEffect(() => {
        fetchData();
    }, [])

    const [campaign, setCampaign] = useState<any>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    return (
        <>
            <Sheet open={notiScreen} onOpenChange={() => { setNotiScreen(false) }} >
                <SheetContent className="px-1">
                    <SheetHeader className="px-4">
                        <SheetTitle className="tracking-wide">Notifications</SheetTitle>
                    </SheetHeader>
                    {
                        dataLoading ? <div className="flex justify-center h-[50vh] items-center"><AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" /></div> :
                            collaborations && collaborations.length > 0 ?
                                collaborations.map((c: any) => (
                                    <NotiBox fetchData={fetchData} setSheetOpen={setSheetOpen} collaboration={c} setCampaign={setCampaign} />
                                )) :
                                <SheetDescription className="flex justify-center h-[50vh] items-center text-sm">No notifications</SheetDescription>
                    }
                </SheetContent>
            </Sheet>
            <CampaignSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} campaign={campaign} />
        </>
    )
}

export default NotificationSheet
