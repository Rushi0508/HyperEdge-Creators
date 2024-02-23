import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(){
    try{
        const creator = await getCurrentUser();
        const collaborations = await prisma.collaboration.findMany({
            where: {
                creatorId: creator?.id,
                status: "PENDING"
            },
            include: {
                campaign: {
                    include: {
                        brand:{
                            select: {
                                id: true,
                                name: true,
                                logo: true
                            }
                        }
                    }
                }
            },
            cacheStrategy:{
                ttl: 60,
                swr: 30
            }
        })
        return NextResponse.json({success: true, collaborations:collaborations})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}

// Handle collab status
export async function POST(req: Request){
    try{
        const body = await req.json();
        const creator = await getCurrentUser();
        if (creator && creator.campaignInviteIds.includes(body.campaignId)) {
            const updatedUser = await prisma.creator.update({
              where: {
                id: creator.id,
              },
              data: {
                campaignInviteIds: {
                  set: creator.campaignInviteIds.filter(id => id !== body.campaignId),
                },
              },
            });
        }
        if(body.status==="DECLINED"){
            await prisma.collaboration.delete({
                where: {
                    id: body.collaborationId,
                }
            });
            await prisma.campaign.update({
                where: {
                    id: body.campaignId
                },
                data:{
                   collaborators: {
                        disconnect: {
                            id: creator?.id
                        }
                   }
                }
            })
        }
        else if(body.status==="APPROVED"){
            await prisma.collaboration.findUnique({
                where: {
                    id: body.collaborationId,
                    status: body.status
                }
            })
        }
        return NextResponse.json({success: true})
    }catch(error){
        return NextResponse.json({errors: error})
    }
}
