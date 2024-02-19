import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import React, { useEffect, useState } from 'react'
import NotiBox from "./NotiBox";
import axios from "axios";
import CampaignSheet from "../(site)/components/CampaignSheet";

function NotificationSheet({ setNotiScreen, notiScreen }: any) {
    const [collaborations, setCollaborations] = useState<any>([]);
    const fetchData = async () => {
        const { data } = await axios.get('/api/notifications');
        if (data.hasOwnProperty('success')) {
            setCollaborations(data.collaborations);
        }
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
                        collaborations && collaborations.length > 0 ?
                            collaborations.map((c: any) => (
                                <NotiBox setSheetOpen={setSheetOpen} collaboration={c} setCampaign={setCampaign} />
                            )) :
                            <SheetDescription>No notifications</SheetDescription>
                    }
                </SheetContent>
            </Sheet>
            <CampaignSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} campaign={campaign} />
        </>
    )
}

export default NotificationSheet
