"use client";
import { Text, Box, Stack, Input, Button } from "@chakra-ui/react";
import { useActionState, useState } from "react";
import { updateOrderAction } from "./action";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const initialState = {
    success: null,
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    updateOrderAction,
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
          Edit Order
        </Text>
        <Box className=" w-full h-1 bg-black"></Box>
        <Stack as="form" action={formAction}>
          <input type="hidden" name="orderId" value={id} />
          {/* <Text textStyle="lg">Name</Text>
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
          /> */}
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
            disabled={weight === "" || price === ""}
          >
            Update Order
          </Button>
        </Stack>
      </Box>
    </>
  );
}
