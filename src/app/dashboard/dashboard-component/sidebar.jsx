"use client";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { logoutAction } from "../action/logout";
import React from "react";
import Link from "next/link";

export default function Sidebar({ admin }) {
  return (
    <Box className="bg-white w-80 h-fit" rounded={"lg"} padding={5}>
      <Text fontSize={"4xl"} fontWeight="bold">
        Hi{admin ? `, ${admin.name}` : ""}
      </Text>
      <Stack as="form" action={logoutAction} mt={4}>
        <Button
          as={Link}
          href="/dashboard"
          bg="blue.400"
          fontWeight="bold"
          fontSize="xl"
        >
          Dashboard
        </Button>
        <Button
          as={Link}
          href="/dashboard/history"
          bg="blue.400"
          fontWeight="bold"
          fontSize="xl"
        >
          History
        </Button>
        <Button type="submit" bg="red.400" fontWeight="bold" fontSize="xl">
          log out
        </Button>
      </Stack>
    </Box>
  );
}
