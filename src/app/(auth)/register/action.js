"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../utils/prisma";
import bcrypt from "bcrypt";
export async function registrationAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      role: "ADMIN",
    },
  });
  console.log(user);
  redirect("/");
}
