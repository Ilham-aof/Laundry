import { Box } from "@chakra-ui/react";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <Box className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <Box
        className="flex-col w-150 h-170 bg-white rounded-xl"
        p="7"
        spaceY={7}
      >
        {children}
      </Box>
    </Box>
  );
}
