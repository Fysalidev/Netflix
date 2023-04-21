import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if request method is POST
  if (req.method != "POST") {
    return res.status(405).end();
  }

  try {
    // Get email, name, and password from request body
    const { email, name, password } = req.body;

    // Check if email and password are provided
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    // If user exists, throw error
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // Return user
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
