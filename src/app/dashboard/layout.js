import { cookies } from "next/headers";
import { prisma } from "../../utils/prisma";
import { redirect } from "next/navigation";
import { Box } from "@chakra-ui/react";

export default async function layout({ children }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    redirect("/");
  }

  const checkSession = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!checkSession || checkSession.expiresAt < new Date()) {
    cookies().delete("sessionId");
    redirect("/");
  }

  return (
    <Box className="bg-blue-300 w-screen h-screen flex" p={10} spaceX={10}>
      <>{children}</>
    </Box>
  );
}
