import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { pricingPlans } from '@/utils/constants';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    return new Response('Webhook secret not found', { status: 500 });
  }

  // Get the headers
  const headersList = headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  
  let evt;
  try {
    evt = WebhookEvent.verify(
      JSON.stringify(payload),
      {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      },
      WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  // Handle the webhook
  const { type: eventType, data: eventData } = evt;
  
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = eventData;
    
    try {
      const sql = await getDbConnection();
      const email = email_addresses[0]?.email_address;
      const fullName = [first_name, last_name].filter(Boolean).join(' ');
      
      // Get the basic plan price_id from constants
      const basicPlan = pricingPlans.find(plan => plan.id === 'basic');
      const basicPriceId = basicPlan ? basicPlan.priceId : "";
      
      // Generate a unique customer_id (using Clerk user ID as prefix)
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