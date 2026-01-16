"use server";

import { prisma } from "../../../utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId) {
    await prisma.session.delete({
      where: { id: sessionId },
    });
  }

  cookieStore.delete("sessionId");
  redirect("/");
}
