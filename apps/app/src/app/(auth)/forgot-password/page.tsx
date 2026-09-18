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
import { requestPasswordReset } from "../actions";

export const metadata = { title: "Zaboravljena lozinka" };

export default async function ForgotPasswordPage({
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
            <CardTitle className="text-xl">Zaboravljena lozinka</CardTitle>
            <CardDescription>
              Unesi email — poslaćemo ti link za postavljanje nove lozinke.
            </CardDescription>
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

              <form action={requestPasswordReset} className="grid gap-6">
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
                <Button type="submit" className="w-full">
                  Pošalji link
                </Button>
              </form>

              <div className="text-center text-sm">
                <Link href="/login" className="underline underline-offset-4">
                  Nazad na prijavu
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
