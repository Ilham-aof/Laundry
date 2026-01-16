"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../utils/prisma";
export async function addNewCustomerAction(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");

  const user = await prisma.user.create({
    data: {
      name,
      phone,
    },
  });
  console.log(user);
  redirect("/dashboard");
}
