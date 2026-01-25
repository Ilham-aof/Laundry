"use server";
import { prisma } from "../../../utils/prisma";

export async function getCustomerChartLast7Days() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 6); // 7 hari termasuk hari ini

  const orders = await prisma.order.findMany({
    where: {
      orderDate: {
        gte: startDate,
        lte: today,
      },
    },
    select: {
      orderDate: true,
      userId: true,
    },
    orderBy: {
      orderDate: "asc",
    },
  });

  // Siapkan 7 hari default = 0
  const result = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const key = d.toISOString().split("T")[0];
    result[key] = new Set();
  }

  // Hitung order per hari
  orders.forEach((order) => {
    const key = order.orderDate.toISOString().split("T")[0];
    if (result[key]) {
      result[key].add(order.userId);
    }
  });

  // Format untuk chart
  return Object.entries(result).map(([date, users]) => ({
    date,
    total: users.size,
  }));
}
