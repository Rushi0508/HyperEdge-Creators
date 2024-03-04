import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { secondId } = body;
    const memberIds1 = [user?.id, secondId];
    const memberIds2 = [secondId, user?.id];
    if (user) {
      const chat = await prisma.chat.findFirst({
        where: {
          AND: [
            {
              members: {
                has: user.id,
              },
            },
            {
              members: {
                has: secondId,
              },
            },
          ],
        },
      });
      return NextResponse.json({ success: true, chats: chat });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
