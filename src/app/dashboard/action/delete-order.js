"use server";

import { prisma } from "../../../utils/prisma";
import { revalidatePath } from "next/cache";

export async function deleteOrderAction(orderId) {
  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });

  // refresh dashboard data
  revalidatePath("/dashboard");
}
