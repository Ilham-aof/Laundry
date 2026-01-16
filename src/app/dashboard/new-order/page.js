"use client";
import { Text, Box, Stack, Input, Button } from "@chakra-ui/react";
import { useActionState } from "react";
import { addNewOrderAction } from "./action";

export default function page() {
  const initialState = {
    success: null,
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    addNewOrderAction,
    initialState
  );

  return (
    <>
      <Box
        className="flex-col w-150 h-170 bg-white rounded-xl"
        p="7"
        spaceY={7}
      >
        <Text fontWeight="bold" textStyle="4xl" textAlign="center">
          Add New Order
        </Text>
        <Box className=" w-full h-1 bg-black"></Box>
        <Stack as="form" action={formAction}>
          <Text textStyle="lg">Name</Text>
          <Input name="name" placeholder="Enter customer name" />
          <Text textStyle="lg">Phone Number</Text>
          <Input name="phone" placeholder="Enter phone number" />
          <Text textStyle="lg">Weight</Text>
          <Input name="weight" placeholder="Enter the weight (Kg)" />
          <Text textStyle="lg">Price</Text>
          <Input name="price" placeholder="Enter the price (Rp)" />
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
          >
            Add New Order
          </Button>
        </Stack>
      </Box>
    </>
  );
}
