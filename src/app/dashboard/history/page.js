import Sidebar from "../dashboard-component/sidebar";
import OrderTable from "../dashboard-component/orderTable";
import { prisma } from "../../../utils/prisma";
import { Box } from "@chakra-ui/react";
import { getOrders } from "../action/get-order";

export default async function history() {
  const orders = await getOrders({ type: "completed" });
  return (
    <>
      <Sidebar />
      <Box className="bg-white w-auto h-auto">
        <OrderTable orders={orders} />
      </Box>
    </>
  );
}
