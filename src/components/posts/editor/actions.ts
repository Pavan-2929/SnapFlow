"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validations";

const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { content } = createPostSchema.parse({ content: input });
  console.log(content);

  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
};

export default submitPost;
