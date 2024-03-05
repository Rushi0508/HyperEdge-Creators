import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (user) {
      const chats = await prisma.chat.findMany({
        where: {
          creatorId: user.id,
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
      return NextResponse.json({ success: true, chats: chats });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
