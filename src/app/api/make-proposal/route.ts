import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request){
    try{
        const body = await req.json()
        const creator = await getCurrentUser();
        if(creator){
            const proposal = await prisma.proposal.create({
                data:{
                    campaignId: body.campaignId,
                    proposedRate: body.proposedRate,
                    message: body.message,
                    creatorId: creator.id,
                    status: "PENDING"
                }
            })
            return NextResponse.json({success: true})
        }
        else{
            throw Error()
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
