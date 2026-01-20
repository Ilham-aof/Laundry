"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../utils/prisma";

export async function updateOrderAction(_, formData) {
  const orderId = Number(formData.get("orderId"));
  const weight = Number(formData.get("weight"));
  const price = Number(formData.get("price"));

  if (!orderId || isNaN(orderId)) {
    return {
      success: false,
      message: "Invalid order ID",
    };
  }

  if (!weight || isNaN(weight) || weight <= 0) {
    return {
      success: false,
      message: "Invalid weight",
    };
  }

  if (!price || isNaN(price) || price <= 0) {
    return {
      success: false,
      message: "Invalid price",
    };
  }

  const order = await prisma.order.findFirst({
    where: { id: orderId },
  });

  if (!order) {
    return {
      success: false,
      message: "Order not found",
    };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      weight,
      price,
    },
  });

  redirect("/dashboard");
}
