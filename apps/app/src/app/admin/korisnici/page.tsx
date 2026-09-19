import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdminClient } from "@repo/auth/server";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import { setRole } from "./actions";

export const metadata = { title: "Korisnici — Admin portal" };

const PER_PAGE = 50;

function formatDate(value: string | null | undefined): string {
  return value ? new Date(value).toLocaleDateString("sr-RS") : "—";
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; error?: string; message?: string }>;
}) {
  const { page, error, message } = await searchParams;
  const user = await requireAdmin();

  const pageNum = Math.max(1, Number(page) || 1);

  // Korisnici — service-role admin API (poveren serverski posao, samo za admina).
  const admin = createSupabaseAdminClient();
  const usersResult = await admin.auth.admin.listUsers({ page: pageNum, perPage: PER_PAGE });
  if (usersResult.error) {
    throw new Error(`Čitanje korisnika nije uspelo: ${usersResult.error.message}`);
  }
  const users = usersResult.data.users;
  const lastPage = (usersResult.data as { lastPage?: number }).lastPage ?? pageNum;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
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
          <CardTitle>Korisnici</CardTitle>
          <CardDescription>
            Registrovani nalozi i uloge. Uloga se čuva u app_metadata — korisnik ne može sam da je
            promeni.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Korisnik</TableHead>
                <TableHead>Uloga</TableHead>
                <TableHead>Registrovan</TableHead>
                <TableHead>Poslednja prijava</TableHead>
                <TableHead className="text-right">Akcija</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((account) => {
                const accountRole =
                  (account.app_metadata as { role?: string } | null)?.role ?? "user";
                const fullName = (account.user_metadata as { full_name?: string } | null)
                  ?.full_name;
                const isSelf = account.id === user.id;
                const nextRole = accountRole === "admin" ? "user" : "admin";
                return (
                  <TableRow key={account.id}>
                    <TableCell>
                      <div className="grid leading-tight">
                        <span className="font-medium">{fullName ?? "—"}</span>
                        <span className="text-muted-foreground text-xs">{account.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={accountRole === "admin" ? "default" : "secondary"}>
                        {accountRole}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(account.created_at)}</TableCell>
                    <TableCell>{formatDate(account.last_sign_in_at)}</TableCell>
                    <TableCell className="text-right">
                      {isSelf ? (
                        <span className="text-muted-foreground text-xs">tvoj nalog</span>
                      ) : (
                        <form action={setRole}>
                          <input type="hidden" name="userId" value={account.id} />
                          <input type="hidden" name="role" value={nextRole} />
                          <Button type="submit" variant="outline" size="sm">
                            {nextRole === "admin" ? "Postavi za admina" : "Ukloni admina"}
                          </Button>
                        </form>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {lastPage > 1 ? (
            <div className="mt-4 flex items-center justify-end gap-2">
              <span className="text-muted-foreground text-xs">
                Strana {pageNum} od {lastPage}
              </span>
              {pageNum > 1 ? (
                <Button asChild variant="outline" size="sm">
                  <a href={`/admin/korisnici?page=${pageNum - 1}`}>Prethodna</a>
                </Button>
              ) : null}
              {pageNum < lastPage ? (
                <Button asChild variant="outline" size="sm">
                  <a href={`/admin/korisnici?page=${pageNum + 1}`}>Sledeća</a>
                </Button>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
