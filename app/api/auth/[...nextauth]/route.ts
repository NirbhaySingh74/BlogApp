// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';  // Changed from next-auth/react
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };