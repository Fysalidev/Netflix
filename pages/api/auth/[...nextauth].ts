import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import prismadb from "@/lib/prismadb";

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or password required");
        }

        // Check if user exists
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If user does not exist, throw error
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        // Check if password is correct
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        // If password is incorrect, throw error
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
