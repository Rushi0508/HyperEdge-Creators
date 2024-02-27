import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(){
    try{
        const creator = await getCurrentUser();
        if(creator){
            const proposals = await prisma.proposal.findMany({
                where:{
                    creatorId: creator.id
                },
                include:{
                    campaign:{
                        include:{
                            brand:{
                                select:{
                                    id: true,
                                    name:true,
                                    logo: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return NextResponse.json({success: true, proposals: proposals})
        }
        else{
            throw Error()
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}
