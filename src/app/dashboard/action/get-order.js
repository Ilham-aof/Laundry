"use server";

import { prisma } from "../../../utils/prisma";

export async function getOrders({ type }) {
  // type: "active" | "completed"

  const where =
    type === "completed"
      ? {
          paymentStatus: true,
          pickupStatus: true,
        }
      : {
          OR: [{ paymentStatus: false }, { pickupStatus: false }],
        };

  return await prisma.order.findMany({
    where,
    include: {
      user: true,
    },
    orderBy: {
      orderDate: "desc",
    },
  });
}
