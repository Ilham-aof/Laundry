"use client";
import { Text, Box, Stack, Input, Button } from "@chakra-ui/react";
import { addNewCustomerAction } from "./action";
import { useState } from "react";

export default function page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
        <Stack as="form" action={addNewCustomerAction}>
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
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your Phone Number"
          />

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
            disabled={name === "" || phone === ""}
          >
            Add New Customer
          </Button>
        </Stack>
      </Box>
    </>
  );
}
