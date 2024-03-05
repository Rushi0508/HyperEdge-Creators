import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const sender = await getCurrentUser();
    const body = await req.json();
    const { brandId } = body;
    if (sender) {
      // Check if chat already exists
      const chatExists = await prisma.chat.findFirst({
        where: {
          creatorId: sender.id,
          brandId: brandId,
        },
      });
      if (chatExists) {
        return NextResponse.json({
          success: true,
          chat: chatExists,
        });
      }
      const chat = await prisma.chat.create({
        data: {
          creatorId: sender.id,
          brandId: brandId,
        },
      });
      return NextResponse.json({
        success: true,
        chat: chat,
      });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
