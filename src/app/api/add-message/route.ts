import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { chatId, content } = body;
    if (user) {
      const message = await prisma.message.create({
        data: {
          chatId: chatId,
          content: content,
          senderId: user.id,
        },
      });
      return NextResponse.json({ success: true });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
