"use client";
import { useState } from "react";
import { validatePassword } from "./lib/validasiPassword";
import { registrationAction } from "./action";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";

export default function Register() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);

  function handlerPasswordChange(e) {
    const passValue = e.target.value;
    setPassword(passValue);

    const result = validatePassword(passValue);
    setPasswordError(result.errors);
  }

  return (
    <>
      <Text fontWeight="bold" textStyle="4xl" textAlign="center">
        Register
      </Text>
      <Box className=" w-full h-1 bg-black"></Box>
      <Stack as="form" action={registrationAction}>
        <Text textStyle="lg">Name</Text>
        <Input name="name" placeholder="Enter your name" />
        <Text textStyle="lg">E-mail</Text>
        <Input name="email" type="email" placeholder="Enter your email" />
        <Text textStyle="lg">Password</Text>
        <Input
          name="password"
          type="password"
          onChange={handlerPasswordChange}
          placeholder="Enter your password"
        />
        <Stack spacing={1}>
          {password !== "" && passwordError.length === 0 && (
            <Text color="green.500" fontSize="sm">
              Password kuat
            </Text>
          )}

          {passwordError.map((err, i) => (
            <Text key={i} color="red.500" fontSize="sm">
              • {err}
            </Text>
          ))}
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
          mt={7}
          disabled={passwordError.length > 0 || password === ""}
        >
          Sign In
        </Button>
      </Stack>
    </>
  );
}
