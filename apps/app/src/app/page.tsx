import { redirect } from "next/navigation";

export default function HomePage() {
  // Middleware već preusmerava neulogovane na /login.
  redirect("/dashboard");
}
