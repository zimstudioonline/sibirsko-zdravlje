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
import Link from "next/link";
import { deletePost } from "./actions";

export const metadata = { title: "Blog — Admin portal" };

interface PostListRow {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
}

function formatDate(value: string | null | undefined): string {
  return value ? new Date(value).toLocaleDateString("sr-RS") : "—";
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  await requireAdmin();

  const admin = createSupabaseAdminClient();
  const result = await admin
    .from("posts")
    .select("id, slug, title, published, published_at, updated_at")
    .order("updated_at", { ascending: false });
  if (result.error) {
    throw new Error(`Čitanje objava nije uspelo: ${result.error.message}`);
  }
  const posts = (result.data ?? []) as PostListRow[];

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
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1.5">
            <CardTitle>Blog objave</CardTitle>
            <CardDescription>
              Objavljeni tekstovi su javni na marketing sajtu; nacrti se vide samo ovde.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/blog/novo">Nova objava</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">Još nema objava.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naslov</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Objavljeno</TableHead>
                  <TableHead>Izmenjeno</TableHead>
                  <TableHead className="text-right">Akcije</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="grid leading-tight">
                        <span className="font-medium">{post.title}</span>
                        <span className="text-muted-foreground text-xs">/blog/{post.slug}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "objavljeno" : "nacrt"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(post.published_at)}</TableCell>
                    <TableCell>{formatDate(post.updated_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/blog/${post.id}`}>Izmeni</Link>
                        </Button>
                        <form action={deletePost}>
                          <input type="hidden" name="id" value={post.id} />
                          <Button type="submit" variant="ghost" size="sm">
                            Obriši
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
