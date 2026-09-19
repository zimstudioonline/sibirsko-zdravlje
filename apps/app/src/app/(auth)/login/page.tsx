import { GoogleIcon } from "@/components/google-icon";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@repo/ui";
import Link from "next/link";
import { login, signInWithGoogle } from "../actions";

export const metadata = { title: "Prijava" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Dobrodošao nazad</CardTitle>
            <CardDescription>Prijavi se na {"Sibirsko Zdravlje"} nalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {error ? (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              {message ? (
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              ) : null}

              <form action={signInWithGoogle}>
                <Button variant="outline" className="w-full" type="submit">
                  <GoogleIcon className="size-4" />
                  Nastavi sa Google-om
                </Button>
              </form>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">ili</span>
              </div>

              <form action={login} className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ti@primer.rs"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Lozinka</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Zaboravljena lozinka?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Prijavi se
                </Button>
              </form>

              <div className="text-center text-sm">
                Nemaš nalog?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Registruj se
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
