import { z } from "zod";

const requiredString = z.string().trim().min(1, "required");

export const registerSchema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters numbers, _ and - are allowed",
  ),
  email: requiredString.email("Invalid email address"),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});
