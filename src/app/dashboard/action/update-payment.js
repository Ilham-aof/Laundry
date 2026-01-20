"use server";

import { prisma } from "../../../utils/prisma";
import { revalidatePath } from "next/cache";

export async function updatePaymentStatus(orderId, isPaid) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: isPaid,
      paidAt: isPaid ? new Date() : null,
    },
  });

  // refresh data dashboard
  revalidatePath("/dashboard");
}
