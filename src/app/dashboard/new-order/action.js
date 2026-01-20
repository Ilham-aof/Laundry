"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../utils/prisma";
import { convertPhone } from "../action/convertPhone";

export async function addNewOrderAction(_, formData) {
  const rawName = formData.get("name");
  const rawPhone = formData.get("phone");
  const weight = formData.get("weight");
  const price = formData.get("price");

  if (!rawName || rawName.trim() === "") {
    return {
      success: false,
      message: "Name is required",
    };
  }

  const name = rawName.trim();
  const phone = convertPhone(rawPhone);

  const user = await prisma.user.findFirst({
    where: {
      phone,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (user.name.toLowerCase() !== name.toLowerCase()) {
    return {
      success: false,
      message: "Name does not match phone number",
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
