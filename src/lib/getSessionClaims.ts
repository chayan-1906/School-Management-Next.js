'use server';

import {auth} from "@clerk/nextjs/server";

async function getSessionClaims() {
    const {sessionClaims, userId} = await auth() as { sessionClaims?: { metadata?: { role?: string } }; userId?: string };
    const role = sessionClaims?.metadata?.role as string;
    return {role, userId};
}

export default getSessionClaims;
