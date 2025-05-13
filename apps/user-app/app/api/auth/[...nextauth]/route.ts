import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

// This is a dynamic route handler for NextAuth in App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Prevent static generation for this route to avoid the getStaticPaths error
export const dynamic = 'force-dynamic';
