import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { parse } from "url";
import prisma from '@/app/libs/prismadb'

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
        const user = await getCurrentUser();
        return NextResponse.json({success: true, user: user})
    }catch(error){
        console.log(error)
        return NextResponse.json({errors: error})
    }
}