"use server";

import { prisma } from "../../../utils/prisma";
import { revalidatePath } from "next/cache";

export async function updatePickupStatus(orderId, isPicked) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      pickupStatus: isPicked,
      pickedAt: isPicked ? new Date() : null,
    },
  });

  // refresh data dashboard
  revalidatePath("/dashboard");
}
