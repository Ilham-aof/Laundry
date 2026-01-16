"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../utils/prisma";
import { cookies } from "next/headers";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ email, password });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: true,
  });
  console.log(newSession);
  redirect("/dashboard");
}
