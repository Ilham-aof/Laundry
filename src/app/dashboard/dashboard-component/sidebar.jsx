"use client";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { logoutAction } from "../action/logout";
import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Box className="bg-white w-auto h-auto">
      <Text>testes</Text>
      <Stack as="form" action={logoutAction}>
        <Button as={Link} href="/dashboard">
          Dashboard
        </Button>
        <Button as={Link} href="/dashboard/history">
          History
        </Button>
        <Button type="submit" bg="red.400">
          log out
        </Button>
      </Stack>
    </Box>
  );
}
