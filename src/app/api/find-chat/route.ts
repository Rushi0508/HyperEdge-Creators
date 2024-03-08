import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chatId } = body;
    if (chatId) {
      const chat = await prisma.chat.findFirst({
        where: {
          id: chatId,
        },
        include: {
          brand: {
            select: {
              name: true,
              logo: true,
              id: true,
              personName: true,
            },
          },
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
