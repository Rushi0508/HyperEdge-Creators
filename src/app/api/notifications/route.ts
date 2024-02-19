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
                ttl: 1000,
                swr: 200
            }
        })
        return NextResponse.json({success: true, collaborations:collaborations})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
