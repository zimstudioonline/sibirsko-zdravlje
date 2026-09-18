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
import { createSupabaseServerClient } from "@repo/auth/server";
import { redirect } from "next/navigation";
import { changePassword } from "../actions";

export const metadata = { title: "Nova lozinka" };

/** Stranica na koju vodi link iz "zaboravljena lozinka" emaila (recovery sesija). */
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?error=${encodeURIComponent("Link je istekao — zatraži novi.")}`);
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Postavi novu lozinku</CardTitle>
            <CardDescription>Za nalog {user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {error ? (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <form action={changePassword} className="grid gap-6">
                <input type="hidden" name="backTo" value="/reset-password" />
                <div className="grid gap-3">
                  <Label htmlFor="password">Nova lozinka (min. 8 karaktera)</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirm">Ponovi lozinku</Label>
                  <Input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sačuvaj lozinku
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
