import Sidebar from "./dashboard-component/sidebar";
import OrderTable from "./dashboard-component/orderTable";
import OrderButton from "./dashboard-component/orderButton";
import OrderChart from "./dashboard-component/orderChart";
import CustomerChart from "./dashboard-component/customerChart";
import NewCustomerChart from "./dashboard-component/newCustomerChart";

import { getOrderChartLast7Days } from "./action/get-7day-order";
import { getCustomerChartLast7Days } from "./action/get-7day-customer";
import { getNewCustomerChartLast7Days } from "./action/get-7day-new-customer";
import { getAdmin } from "./action/get-admin";

import { Box } from "@chakra-ui/react";
import { getOrders } from "./action/get-order";

export default async function dashboard() {
  const admin = await getAdmin();
  const orders = await getOrders({ type: "unfinish" });
  const chartOrderData = await getOrderChartLast7Days();
  const chartCustomerData = await getCustomerChartLast7Days();
  const chartNewCustomerData = await getNewCustomerChartLast7Days();

  return (
    <>
      <Box className="w-vw h-vh flex" p={3} spaceX={4}>
        <Sidebar admin={admin} />
        <Box className="bg-white w-screen h-vh" p={5} spaceY={7} rounded={"lg"}>
          <OrderButton />
          <OrderTable orders={orders} />
          <OrderChart data={chartOrderData} />
          <CustomerChart data={chartCustomerData} />
          <NewCustomerChart data={chartNewCustomerData} />
        </Box>
      </Box>
    </>
  );
}
