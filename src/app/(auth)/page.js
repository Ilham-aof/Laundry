import LoginForm from "./loginForm";
import { checkAdminExists } from "./action/checkAdmin";
import { cookies } from "next/headers";
import { prisma } from "../../utils/prisma";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (session) {
      redirect("/dashboard");
    }
  }

  const isAdminExists = await checkAdminExists();
  return (
    <>
      <LoginForm isAdminExists={isAdminExists} />
    </>
  );
}
