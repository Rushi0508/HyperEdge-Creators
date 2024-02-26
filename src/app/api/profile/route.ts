import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { parse } from "url";
import prisma from '@/app/libs/prismadb'
import getSession from "@/app/actions/getSession";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const user = await getCurrentUser();
        const updatedUser = await prisma?.creator.update({
            where: {
                id: user?.id
            },
            data: body
        })
        return NextResponse.json({success: true, user:updatedUser})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}

export async function GET(req: Request){
    try{
        const session = await getSession();
        const user = await prisma.creator.findUnique({
            where: {
                email: session?.user?.email as string
            },
            include:{
                collaborations:{
                    where:{
                        status: "APPROVED"
                    },
                    include:{
                        campaign:{
                            select:{
                                id: true,
                                name: true
                            }
                        },
                        brand:{
                            select:{
                                id: true,
                                name: true,
                                logo: true
                            }
                        }
                    }
                }
            }
        });
        return NextResponse.json({success: true, user: user})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}