"use client";

import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useActionState } from "react";
import { loginAction } from "./action/loginAction";
import Link from "next/link";

export default function LoginForm({ isAdminExists }) {
  const initialState = {
    success: null,
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <Box spaceY={7}>
      <Text fontWeight="bold" textStyle="4xl" textAlign="center">
        Sign In
      </Text>
      <Box className=" w-full h-1 bg-black"></Box>
      <Stack as="form" action={formAction}>
        <Stack h={200}>
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
        </Stack>
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
        {!isAdminExists && (
          <Button
            as={Link}
            href="/register"
            bg="blue.400"
            _hover={{ bg: "blue.600" }}
            fontWeight="bold"
            fontSize="lg"
            p="3"
          >
            Register
          </Button>
        )}
      </Stack>
    </Box>
  );
}
