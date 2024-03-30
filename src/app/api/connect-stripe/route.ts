import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!);

export async function POST(req: Request) {
  try {
    const creator = await getCurrentUser();
    if (creator) {
      const account = await stripe.accounts.create({
        type: "standard", // or 'express' if you're using Stripe Connect Express
        country: "IN",
        email: creator.email!,
      });
      const updatedUser = await prisma.creator.update({
        where: {
          id: creator.id,
        },
        data: {
          stripeAccountId: account.id,
        },
      });
      return NextResponse.json({ success: true, user: updatedUser });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
