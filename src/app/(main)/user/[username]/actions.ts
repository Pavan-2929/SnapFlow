"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validations";

export async function updateProfile(values: UpdateUserProfileValues) {
  const validateValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const udpatedUser = await prisma.user.update({
    where: { id: user.id },
    data: validateValues,
    select: getUserDataSelect(user.id),
  });

  return udpatedUser;
}
