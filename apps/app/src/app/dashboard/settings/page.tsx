import { changePassword } from "@/app/(auth)/actions";
import { createSupabaseServerClient } from "@repo/auth/server";
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@repo/ui";
import { redirect } from "next/navigation";

export const metadata = { title: "Podešavanja" };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const role = (user.app_metadata as { role?: string } | null)?.role ?? "user";
  const provider = (user.app_metadata as { provider?: string } | null)?.provider ?? "email";

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Nalog</CardTitle>
          <CardDescription>Osnovni podaci o tvom nalogu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <span className="text-muted-foreground">Email:</span> {user.email}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-muted-foreground">Uloga:</span>
            <Badge variant={role === "admin" ? "default" : "secondary"}>{role}</Badge>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-muted-foreground">Prijava preko:</span> {provider}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promena lozinke</CardTitle>
          <CardDescription>
            Ako si se registrovao preko Google-a, ovde možeš da postaviš lozinku za prijavu emailom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={changePassword} className="grid max-w-sm gap-6">
            <input type="hidden" name="backTo" value="/dashboard/settings" />
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
            <Button type="submit" className="w-fit">
              Sačuvaj lozinku
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
