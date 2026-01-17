"use client";
import {
  Box,
  Switch,
  Badge,
  Button,
  Text,
  Table,
  ButtonGroup,
  Heading,
  IconButton,
  Pagination,
  Stack,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";
import { updatePaymentStatus } from "../action/update-payment";
import { updatePickupStatus } from "../action/update-pickup";

export default function OrderTable({ orders }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedOrders = orders.slice(start, end);

  async function togglePayment(orderId, currentPaymentStatus) {
    await updatePaymentStatus(orderId, !currentPaymentStatus);
  }

  async function togglePickup(orderId, currentPickupStatus) {
    await updatePickupStatus(orderId, !currentPickupStatus);
  }

  return (
    <Box className="bg-white w-auto h-auto">
      <Button as={Link} href="/dashboard/new-customer">
        Tambah Customer
      </Button>
      <Button as={Link} href="/dashboard/new-order">
        make Order
      </Button>
      <Stack width="full" gap="5">
        <Heading size="xl">Orders</Heading>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
              <Table.ColumnHeader>Weight</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Order Date</Table.ColumnHeader>
              <Table.ColumnHeader>Status Payment</Table.ColumnHeader>
              <Table.ColumnHeader>Status Pick Up</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedOrders.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell>{order.user.name}</Table.Cell>
                <Table.Cell>{order.user.phone}</Table.Cell>
                <Table.Cell>{order.weight}</Table.Cell>
                <Table.Cell>{order.price}</Table.Cell>
                <Table.Cell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Switch.Root
                    checked={order.paymentStatus}
                    onCheckedChange={() =>
                      togglePayment(order.id, order.paymentStatus)
                    }
                    colorPalette="green"
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                  <Badge colorPalette={order.paymentStatus ? "green" : "red"}>
                    {order.paymentStatus ? "Paid" : "Unpaid"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Switch.Root
                    checked={order.pickupStatus}
                    onCheckedChange={() =>
                      togglePickup(order.id, order.pickupStatus)
                    }
                    colorPalette="green"
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                  <Badge colorPalette={order.pickupStatus ? "green" : "red"}>
                    {order.pickupStatus ? "Picked UP" : "Unpicked"}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Pagination.Root
          count={orders.length}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => setPage(e.page)}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
    </Box>
  );
}
