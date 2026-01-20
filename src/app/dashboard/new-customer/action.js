"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../utils/prisma";
import { phoneRule } from "../action/phoneRule";
import { convertPhone } from "../action/convertPhone";

export async function addNewCustomerAction(_, formData) {
  const name = formData.get("name");
  const rawPhone = formData.get("phone");

  if (!name || !rawPhone) {
    return {
      success: false,
      message: "Name and Phone Number are required",
    };
  }

  if (!phoneRule.test(rawPhone)) {
    return {
      success: false,
      message: "Invalid phone number format",
    };
  }

  const phone = convertPhone(rawPhone);

  const existing = await prisma.user.findFirst({
    where: { phone },
  });

  if (existing) {
    return {
      success: false,
      message: "Phone number already registered",
    };
  }

  const user = await prisma.user.create({
    data: {
      name,
      phone,
    },
  });
  console.log(user);
  redirect("/dashboard");
}
