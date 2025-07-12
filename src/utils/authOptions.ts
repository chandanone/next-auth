// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "./prisma";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
// };

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  // 1. Configure the session strategy to use JWT
  session: {
    strategy: "jwt",
  },

  // 2. Add the Prisma adapter
  adapter: PrismaAdapter(prisma),

  // 3. Add your providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // 4. Add the required secret
  secret: process.env.NEXTAUTH_SECRET,
};
