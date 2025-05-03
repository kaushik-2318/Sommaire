import { getDbConnection } from "./db";

export async function handleSubscriptionDeleted({ subscriptionId, stripe }) {
    console.log("Subscription Deleted", subscriptionId);
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const sql = await getDbConnection();
        await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
        console.log("Subscription Deleted Successfully", subscriptionId);
    } catch (error) {
        console.error("Error handling subscription deleted", error);
        throw error;
    }
}

export async function handleCheckoutSessionCompleted({ session }) {
    console.log("Checkout Session Completed", session);
    const customerId = session.customer;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = session.line_items?.data[0]?.price?.id;

    if ('email' in customer && priceId) {
        const { email, name } = customer
        const sql = await getDbConnection();
        await createOrUpdateUser({
            email: email,
            fullName: name,
            customerId,
            priceId,
            status: "active",
            sql
        });
        await createPayment({ session, priceId, userEmail: email, sql });
    }
}

async function createOrUpdateUser({ email, fullName, customerId, priceId, status, sql }) {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (user.length === 0) {
            await sql`INSERT INTO users(email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
        }
    } catch (error) {
        console.error("Error creating or updating user", error);
    }
}


async function createPayment({ session, priceId, userEmail, sql }) {
    try {

        const { amount_total, id, status } = session;

        await sql`INSERT INTO payments(amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
    } catch (error) {

    }
}
