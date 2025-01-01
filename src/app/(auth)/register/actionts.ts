"use server";

import prisma from "@/lib/prisma";
import { registerSchema, RegisterValues } from "@/lib/validations";
import { generateIdFromEntropySize } from "lucia";
import bcryptjs from "bcryptjs";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const register = async (
  credentials: RegisterValues,
): Promise<{ error: string }> => {
  try {
    const { username, email, password } = registerSchema.parse(credentials);

    const userId = generateIdFromEntropySize(10);

    const isUsernameExist = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (isUsernameExist) {
      return {
        error: "Username already taken.",
      };
    }

    const isEmailExist = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (isEmailExist) {
      return {
        error: "Email already registered.",
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      error: "Something went wrong | Please try again.",
    };
  }
};

export default register;
