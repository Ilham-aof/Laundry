"use server";
import { prisma } from "../../../utils/prisma";

export async function getNewCustomerChartLast7Days() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 6); // 7 hari termasuk hari ini

  const users = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
      createdAt: {
        gte: startDate,
        lte: today,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Siapkan 7 hari default = 0
  const result = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const key = d.toISOString().split("T")[0];
    result[key] = 0;
  }

  // Hitung order per hari
  users.forEach((user) => {
    const key = user.createdAt.toISOString().split("T")[0];
    if (result[key] !== undefined) {
      result[key]++;
    }
  });

  // Format untuk chart
  return Object.entries(result).map(([date, total]) => ({
    date,
    total,
  }));
}
