"use client";
import { Text, Box, Stack, Input, Button } from "@chakra-ui/react";
import { addNewCustomerAction } from "./action";
import { useActionState, useState } from "react";
import { phoneRule } from "../action/phoneRule";

export default function page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const initialState = {
    success: null,
    message: "",
  };
  const [state, formAction, pending] = useActionState(
    addNewCustomerAction,
    initialState,
  );

  return (
    <>
      <Box
        className="flex-col w-150 h-170 bg-white rounded-xl"
        p="7"
        spaceY={7}
      >
        <Text fontWeight="bold" textStyle="4xl" textAlign="center">
          Add New Customer
        </Text>
        <Box className=" w-full h-1 bg-black"></Box>
        <Stack as="form" action={formAction}>
          <Text textStyle="lg">Name</Text>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Text textStyle="lg">Phone Number</Text>
          <Input
            name="phone"
            value={phone}
            onChange={(e) => {
              const phoneValue = e.target.value;
              setPhone(phoneValue);
              if (!phoneRule.test(phoneValue)) {
                setPhoneError("Invalid Indonesian phone number");
              } else {
                setPhoneError("");
              }
            }}
            placeholder="Enter your Phone Number"
          />
          {phoneError && (
            <Text color="red.500" fontSize="sm">
              {phoneError}
            </Text>
          )}
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
            mt={7}
            disabled={name === "" || phone === "" || phoneError !== ""}
          >
            Add New Customer
          </Button>
        </Stack>
      </Box>
    </>
  );
}
