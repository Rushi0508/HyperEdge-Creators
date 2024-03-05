import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { brandId } = body;
    if (user) {
      const chat = await prisma.chat.findFirst({
        where: {
          creatorId: user.id,
          brandId: brandId,
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
