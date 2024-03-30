import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { parse } from "url";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const brand = await prisma.brand.findUnique({
            where: {
                id: body.id
            },
            include: {
                collaborations: {
                    where: {
                        status: "APPROVED"
                    },
                    include: {
                        creator: {
                            select:{
                                id: true,
                                fullName: true,
                                avatar: true
                            }
                        },
                        campaign: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json({success: true, brand: brand})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}