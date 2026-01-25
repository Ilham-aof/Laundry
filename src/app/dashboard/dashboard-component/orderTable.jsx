"use client";
import {
  Box,
  Switch,
  Badge,
  Table,
  ButtonGroup,
  Heading,
  IconButton,
  Pagination,
  Stack,
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import { updatePaymentStatus } from "../action/update-payment";
import { updatePickupStatus } from "../action/update-pickup";
import { deleteOrderAction } from "../action/delete-order";

import Link from "next/link";

export default function OrderTable({ orders }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedOrders = orders.slice(start, end);

  async function togglePayment(orderId, newStatus) {
    await updatePaymentStatus(orderId, newStatus);
  }

  async function togglePickup(orderId, newStatus) {
    await updatePickupStatus(orderId, newStatus);
  }

  return (
    <Box>
      <Stack width="full" gap="5">
        <Heading size="2xl" fontWeight="bold">
          Orders List
        </Heading>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
              <Table.ColumnHeader>Weight (Kg)</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Order Date</Table.ColumnHeader>
              <Table.ColumnHeader>Status Payment</Table.ColumnHeader>
              <Table.ColumnHeader>Status Pick Up</Table.ColumnHeader>
              <Table.ColumnHeader>Option</Table.ColumnHeader>
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
                    onCheckedChange={(e) => togglePayment(order.id, e.checked)}
                    colorPalette="green"
                    disabled={order.paymentStatus && order.pickupStatus}
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
                    onCheckedChange={(e) => togglePickup(order.id, e.checked)}
                    colorPalette="green"
                    disabled={order.paymentStatus && order.pickupStatus}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                  <Badge colorPalette={order.pickupStatus ? "green" : "red"}>
                    {order.pickupStatus ? "Picked" : "Pending"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button variant="outline" size="sm">
                        ...
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item
                            value="edit"
                            as={Link}
                            href={`/dashboard/update-order/${order.id}`}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            value="delete"
                            color="fg.error"
                            _hover={{ bg: "bg.error", color: "fg.error" }}
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this order?",
                                )
                              ) {
                                deleteOrderAction(order.id);
                              }
                            }}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
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
