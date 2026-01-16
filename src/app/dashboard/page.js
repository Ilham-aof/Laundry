"use client";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { logoutAction } from "./action/logout";
import { Table } from "@chakra-ui/react";
import Link from "next/link";

export default function dashboard() {
  const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
  ];
  return (
    <>
      <Box className="bg-white w-auto h-auto">
        <Text>testes</Text>
        <Stack as="form" action={logoutAction}>
          <Button>Dashboard</Button>
          <Button>History</Button>
          <Button type="submit" bg="red.400">
            log out
          </Button>
        </Stack>
      </Box>
      <Box className="bg-white w-auto h-auto">
        <Button as={Link} href="/dashboard/new-customer">
          Tambah Customer
        </Button>
        <Button as={Link} href="/dashboard/new-order">
          make Order
        </Button>
        <Text>testes</Text>
        <Table.Root size="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
              <Table.ColumnHeader>Weight</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Order Date</Table.ColumnHeader>
              <Table.ColumnHeader>Status Payment</Table.ColumnHeader>
              <Table.ColumnHeader>Status Pick Up</Table.ColumnHeader>

              <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="end">{item.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  );
}
