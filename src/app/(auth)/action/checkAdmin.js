"use server";

import { prisma } from "../../../utils/prisma";

export async function checkAdminExists() {
  const admin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  return Boolean(admin); // true jika admin sudah ada
}
