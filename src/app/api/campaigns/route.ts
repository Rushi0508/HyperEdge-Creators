import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parse } from "url";

export async function POST(req: Request){
    try{
        const creator = await getCurrentUser();
        let campaigns:any= []
        if(creator){
            campaigns = await prisma.campaign.findMany({
                where:{
                    visibility: "PUBLIC",
                    OR: [
                        {
                            targetCategory: {
                                hasSome: creator?.categories
                            }
                        },{
                            targetCategory: {
                                isEmpty: true
                            }
                        }
                    ]
                },
                include:{
                    brand:{
                        select:{
                            id:true,
                            logo:true,
                            name: true
                        }
                    }
                },
                cacheStrategy:{
                    ttl: 60,
                    swr: 10,
                }
            });
        }
        return NextResponse.json({success: true, campaigns:campaigns})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}

export async function GET(req: Request){
    try{
        var { query } = parse(req.url || '', true);
        const {status}:any= query
        const user = await getCurrentUser();
        const campaigns = await prisma?.campaign.findMany({
            where: {
                collaboratorIds:{
                    has:user?.id
                },
                status: status
            }
        })
        return NextResponse.json({success: true, campaigns:campaigns})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
