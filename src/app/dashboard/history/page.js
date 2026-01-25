import Sidebar from "../dashboard-component/sidebar";
import OrderTable from "../dashboard-component/orderTable";
import { getAdmin } from "../action/get-admin";
import { Box } from "@chakra-ui/react";
import { getOrders } from "../action/get-order";

export default async function history() {
  const orders = await getOrders({ type: "completed" });
  const admin = await getAdmin();

  return (
    <>
      <Box className="w-vw h-screen flex" p={3} spaceX={4}>
        <Sidebar admin={admin} />
        <Box
          className="bg-white w-screen h-fit"
          p={5}
          spaceY={7}
          rounded={"lg"}
        >
          <OrderTable orders={orders} />
        </Box>
      </Box>
    </>
  );
}
