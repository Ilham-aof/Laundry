import Sidebar from "./dashboard-component/sidebar";
import OrderTable from "./dashboard-component/orderTable";
import OrderButton from "./dashboard-component/orderButton";
import { Box } from "@chakra-ui/react";
import { getOrders } from "./action/get-order";

import { prisma } from "../../utils/prisma";

export default async function dashboard() {
  const orders = await getOrders({ type: "unfinish" });

  return (
    <>
      <Sidebar />
      <Box className="bg-white w-auto h-auto">
        <OrderButton />
        <OrderTable orders={orders} />
      </Box>
    </>
  );
}
