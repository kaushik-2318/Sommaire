import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { pricingPlans } from '@/utils/constants';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
    } = body;

    console.log(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email
    );

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !email
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const sql = await getDbConnection();

    const proPlan = pricingPlans.find(plan => plan.id === 'pro');
    const proPriceId = proPlan ? proPlan.priceId : "";

    await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
      VALUES (${200}, ${'success'}, ${razorpay_payment_id}, ${razorpay_order_id}, ${email});
    `;
    
    await sql`
      UPDATE users 
      SET status = 'active', price_id = ${proPriceId}
      WHERE email = ${email};
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verify Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
