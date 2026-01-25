"use client";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function OrderButton() {
  return (
    <Box spaceX={5}>
      <Button
        as={Link}
        href="/dashboard/new-customer"
        bg="blue.400"
        fontWeight="bold"
        fontSize="xl"
      >
        Tambah Customer
      </Button>
      <Button
        as={Link}
        href="/dashboard/new-order"
        bg="blue.400"
        fontWeight="bold"
        fontSize="xl"
      >
        Make Order
      </Button>
    </Box>
  );
}
