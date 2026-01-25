"use server";

import { prisma } from "../../../utils/prisma";

export async function getAdmin() {
  return await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
    select: {
      name: true,
    },
  });
}
