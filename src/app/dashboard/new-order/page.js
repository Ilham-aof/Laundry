"use client";
import { Text, Box, Stack, Input, Button } from "@chakra-ui/react";
import { useActionState, useState } from "react";
import { addNewOrderAction } from "./action";

export default function page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const initialState = {
    success: null,
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    addNewOrderAction,
    initialState,
  );

  return (
    <>
      <Box className="flex items-center justify-center w-screen h-screen">
        <Box
          className="flex-col w-150 h-vh bg-white rounded-xl"
          p="7"
          spaceY={7}
        >
          <Text fontWeight="bold" textStyle="4xl" textAlign="center">
            Add New Order
          </Text>
          <Box className=" w-full h-1 bg-black"></Box>
          <Stack as="form" action={formAction}>
            <Stack h={370}>
              <Text textStyle="lg">Name</Text>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
              />
              <Text textStyle="lg">Phone Number</Text>
              <Input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
              <Text textStyle="lg">Weight</Text>
              <Input
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter the weight (Kg)"
              />
              <Text textStyle="lg">Price</Text>
              <Input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter the price (Rp)"
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
              disabled={
                name === "" || phone === "" || weight === "" || price === ""
              }
            >
              Add New Order
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
