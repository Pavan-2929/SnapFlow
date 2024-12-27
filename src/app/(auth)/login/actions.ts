"use sever"

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, loginValue } from "@/lib/validations";
import bcryptjs from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const login = async (credentials: loginValue): Promise<{ error: string }> => {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const isPasswordValid = await bcryptjs.compare(user.password, password);

    if (!isPasswordValid) {
      return {
        error: "Invalid credentials",
      };
    }

    const session = await lucia.createSession(user.id, {});
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
      error: "Failed to login. Please try again.",
    };
  }
};
