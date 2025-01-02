import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FollowerInfo } from "@/lib/types";
import { NextRequest } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const url = req.nextUrl;
//     const userId = url.pathname.split("/")[3];
//     const { user: loggedInUser } = await validateRequest();

//     if (!loggedInUser) {
//       return Response.json({ error: "user not found" }, { status: 404 });
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       select: {
//         followers: {
//           where: {
//             followerId: loggedInUser.id,
//           },
//           select: {
//             followerId: true,
//           },
//         },
//         _count: {
//           select: {
//             followers: true,
//           },
//         },
//       },
//     });

//     if (!user) {
//       return Response.json({ error: "User not found" }, { status: 404 });
//     }

//     const data: FollowerInfo = {
//       totalFollowers: user._count.followers,
//       isFollowedByLoggedInUser: !!user.followers.length,
//     };

//     return Response.json(data);
//   } catch (error) {
//     console.log(error);
//     return Response.json({ error: "Error fetching user" }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const userId = url.pathname.split("/")[3];
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "user not found" }, { status: 404 });
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const userId = url.pathname.split("/")[3];
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "user not found" }, { status: 404 });
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Error fetching user" }, { status: 500 });
  }
}
