"use client";
import { useState } from "react";
import { validatePassword } from "./lib/validasiPassword";
import { registrationAction } from "./action";
import { Box, Button, Input, Stack, Text, Progress } from "@chakra-ui/react";

export default function Register() {
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState(null);

  function handlerPasswordChange(e) {
    const passValue = e.target.value;
    setPassword(passValue);

    if (passValue === "") {
      setPasswordState(null);
      return;
    }

    const result = validatePassword(passValue);
    setPasswordState(result);
  }

  const strengthConfig = {
    weak: {
      value: 33,
      color: "red.400",
    },
    medium: {
      value: 66,
      color: "yellow.400",
    },
    strong: {
      value: 100,
      color: "green.400",
    },
  };

  return (
    <>
      <Box spaceY={7}>
        <Text fontWeight="bold" textStyle="4xl" textAlign="center">
          Register
        </Text>

        <Box className="w-full h-1 bg-black" />

        <Stack as="form" action={registrationAction} spacing={4}>
          <Stack h={270}>
            <Text>Name</Text>
            <Input name="name" placeholder="Enter your name" />
            <Text>E-mail</Text>
            <Input name="email" type="email" placeholder="Enter your email" />
            <Text>Password</Text>
            <Input
              name="password"
              type="password"
              onChange={handlerPasswordChange}
              placeholder="Enter your password"
            />
            {passwordState && (
              <Progress.Root
                value={strengthConfig[passwordState.strength].value}
                max={100}
                size="sm"
              >
                <Progress.Track bg="gray.200" borderRadius="md">
                  <Progress.Range
                    bg={strengthConfig[passwordState.strength].color}
                    transition="width 0.3s ease"
                  />
                </Progress.Track>
                <Progress.ValueText
                  fontSize="sm"
                  fontWeight="bold"
                  color={strengthConfig[passwordState.strength].color}
                >
                  {passwordState.strength.toUpperCase()}
                </Progress.ValueText>
              </Progress.Root>
            )}
          </Stack>
          <Button
            type="submit"
            bg="blue.400"
            _hover={{ bg: "blue.600" }}
            fontWeight="bold"
            fontSize="lg"
            disabled={!passwordState?.isValid}
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </>
  );
}
