import { getDbConnection } from "./db";
import { getUsersUploadCount } from "./summaries";
import { pricingPlans } from "@/utils/constants";


export async function getPriceId(email) {
    const sql = await getDbConnection();

    const query = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`

    return query?.[0]?.price_id || null;
}

export async function hasActivePlan(email) {
    const sql = await getDbConnection();

    const query = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`

    return query && query.length > 0;
}

export async function hasReachedUploadLimit(userId) {
    const uploadCount = await getUsersUploadCount(userId);

    const priceId = await getPriceId(userId);

    const plan = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';

    const uploadLimit = plan ? 10 : 5;

    return { hasReachedUploadLimit: uploadCount >= uploadLimit }
}

export async function getSubscriptionStatus({ user }) {
    const hasSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress);

    return hasSubscription;
}