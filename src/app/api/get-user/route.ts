import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ success: true, user: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
