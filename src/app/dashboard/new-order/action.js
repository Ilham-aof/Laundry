"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../utils/prisma";
export async function addNewOrderAction(_, formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const weight = formData.get("weight");
  const price = formData.get("price");

  const user = await prisma.user.findFirst({
    where: {
      role: "CUSTOMER",
      name,
      phone,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const order = await prisma.order.create({
    data: {
      weight: Number(weight),
      price: Number(price),
      userId: user.id,
    },
  });
  console.log(order);
  redirect("/dashboard");
}
