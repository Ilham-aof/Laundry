import Sidebar from "./dashboard-component/sidebar";
import OrderTable from "./dashboard-component/orderTable";
import { prisma } from "../../utils/prisma";

export default async function history() {
  const orders = await prisma.order.findMany({
    include: {
      user: true, // relasi ke customer
    },
  });
  return (
    <>
      <Sidebar />
      <OrderTable orders={orders} />
    </>
  );
}
