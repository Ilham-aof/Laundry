"use client";

import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { loginAction } from "./action";
import { useActionState } from "react";

export default function Home() {
  const initialState = {
    success: null,
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <>
      <Text fontWeight="bold" textStyle="4xl" textAlign="center">
        Sign In
      </Text>
      <Box className=" w-full h-1 bg-black"></Box>
      <Stack as="form" action={formAction}>
        <Text textStyle="lg">E-mail</Text>
        <Input name="email" type="email" placeholder="Enter your email" />
        <Text textStyle="lg">Password</Text>
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        {state.success === false && (
          <Text color="red.500">{state.message}</Text>
        )}
        <Button
          type="submit"
          bg="blue.400"
          variant="solid"
          _hover={{
            bg: "blue.600",
          }}
          fontWeight="bold"
          fontSize="lg"
          p="3"
        >
          Sign In
        </Button>
        <Button
          as={Link}
          href="/register"
          bg="blue.400"
          variant="solid"
          _hover={{
            bg: "blue.600",
          }}
          fontWeight="bold"
          fontSize="lg"
          p="3"
        >
          Register
        </Button>
      </Stack>
    </>
  );
}
