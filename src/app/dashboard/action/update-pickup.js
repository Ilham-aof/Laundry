"use server";

import { prisma } from "../../../utils/prisma";
import { revalidatePath } from "next/cache";

export async function updatePickupStatus(orderId, newStatus) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      pickupStatus: newStatus,
    },
  });

  // refresh data dashboard
  revalidatePath("/dashboard");
}
