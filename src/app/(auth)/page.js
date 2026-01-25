import LoginForm from "./loginForm";
import { checkAdminExists } from "./action/checkAdmin";

export default async function loginPage() {
  const isAdminExists = await checkAdminExists();
  return (
    <>
      <LoginForm isAdminExists={isAdminExists} />
    </>
  );
}
