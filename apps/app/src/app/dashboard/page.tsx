import { createSupabaseServerClient } from "@repo/auth/server";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@repo/ui";
import { redirect } from "next/navigation";
import { addNote, deleteNote } from "./actions";

export const metadata = { title: "Kontrolna tabla" };

interface Note {
  id: string;
  content: string;
  created_at: string;
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // RLS filtrira: upit vraća isključivo beleške ulogovanog korisnika.
  const { data: notes } = await supabase
    .from("notes")
    .select("id, content, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Tvoje beleške</CardTitle>
          <CardDescription>
            Demo RLS obrasca: svaki korisnik vidi isključivo svoje podatke — politika je u bazi, ne
            u kodu aplikacije.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={addNote} className="flex gap-2">
            <Input name="content" placeholder="Nova beleška..." required maxLength={2000} />
            <Button type="submit">Dodaj</Button>
          </form>
          <ul className="mt-6 space-y-2">
            {((notes ?? []) as Note[]).map((note) => (
              <li
                key={note.id}
                className="flex items-center justify-between gap-4 rounded-lg border px-4 py-2"
              >
                <span className="text-sm">{note.content}</span>
                <form action={deleteNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <Button type="submit" variant="ghost" size="sm" aria-label="Obriši belešku">
                    ✕
                  </Button>
                </form>
              </li>
            ))}
            {!notes?.length ? (
              <li className="py-4 text-center text-muted-foreground text-sm">Još nema beležaka.</li>
            ) : null}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
