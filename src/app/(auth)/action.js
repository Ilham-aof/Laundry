"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../utils/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

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

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Password is incorrect",
    };
  }

  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt,
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: true,
    expires: expiresAt,
  });
  console.log(newSession);
  redirect("/dashboard");
}

//update scheme buat paidat sama pickedat
