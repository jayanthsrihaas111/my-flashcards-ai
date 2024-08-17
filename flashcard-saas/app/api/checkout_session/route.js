import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function POST(req) {
  let plan;

  try {
    const body = await req.json();

    // Ensure body is not empty
    if (!body || typeof body !== 'object') {
      throw new Error('Request body is empty or invalid');
    }

    plan = body.plan;

    if (!plan) {
      throw new Error('Plan is required');
    }
  } catch (error) {
    console.error('Error parsing JSON or missing plan:', error.message);
    return NextResponse.json({ error: { message: 'Invalid request body' } }, { status: 400 });
  }

  // Determine price based on the plan
  let price;
  if (plan === 'basic') {
    price = formatAmountForStripe(3.99); // $3.99 for Basic
  } else if (plan === 'pro') {
    price = formatAmountForStripe(7.99); // $7.99 for Pro
  } else {
    return NextResponse.json({ error: { message: 'Invalid plan selected' } }, { status: 400 });
  }

  const params = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription`,
          },
          unit_amount: price,
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}