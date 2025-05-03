import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { pricingPlans } from '@/utils/constants';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error('Missing Clerk webhook secret');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  // Retrieve the raw body as a string
  const payload = await req.text();

  // Extract Svix headers
  const headerList = headers();
  const svixId = headerList.get('svix-id');
  const svixTimestamp = headerList.get('svix-timestamp');
  const svixSignature = headerList.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  // Verify the webhook signature
  const svixHeaders = {
    'svix-id': svixId,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature,
  };

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, svixHeaders);
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  const { type: eventType, data: eventData } = evt;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = eventData;

    try {
      const sql = await getDbConnection();
      const email = email_addresses[0]?.email_address;
      const fullName = [first_name, last_name].filter(Boolean).join(' ');
      
      const basicPlan = pricingPlans.find(plan => plan.id === 'basic');
      const basicPriceId = basicPlan ? basicPlan.priceId : "";
      
      const customerId = `cust_${id.replace(/-/g, '').substring(0, 10)}`;

      await sql`INSERT INTO users(email, full_name, customer_id, price_id, status) 
                VALUES (${email}, ${fullName}, ${customerId}, ${basicPriceId}, 'inactive')
                ON CONFLICT (email) DO NOTHING`;

      console.log('User created in database:', id);
    } catch (error) {
      console.error('Error storing user in database:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}