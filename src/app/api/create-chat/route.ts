import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const sender = await getCurrentUser();
    const body = await req.json();
    const { receiverId } = body;
    if (sender) {
      const chat = await prisma.chat.create({
        data: {
          members: [sender.id, receiverId],
        },
      });
      return NextResponse.json({ success: true, chat: chat });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
