import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request){
    try{
        const body = await req.json()
        const creator = await getCurrentUser();
        let collaboration ;
        if(creator){
            collaboration = await prisma.collaboration.findFirst({
                where: {
                    creatorId: creator.id,
                    campaignId: body.campaignId
                }
            })
            if(collaboration){
                return NextResponse.json({success: true, collaboration:collaboration})
            }
            let proposal = await prisma.proposal.findFirst({
                where: {
                    creatorId: creator.id,
                    campaignId: body.campaignId
                }
            })
            if(proposal){
                return NextResponse.json({success: true, proposal:proposal})
            }
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
