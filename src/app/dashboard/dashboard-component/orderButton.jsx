"use client";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function OrderButton() {
  return (
    <Box>
      <Button as={Link} href="/dashboard/new-customer">
        Tambah Customer
      </Button>
      <Button as={Link} href="/dashboard/new-order">
        make Order
      </Button>
    </Box>
  );
}
