import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `{processs.env.NEXT_PUBLIC_APP_URL}?succes=true`,
      cancel_url: `{processs.env.NEXT_PUBLIC_APP_URL}?cancel=truw`,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    return NextResponse.json({ session: session });
  } catch {}
}
