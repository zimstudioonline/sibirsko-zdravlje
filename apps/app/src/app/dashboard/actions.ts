"use server";

import { createSupabaseServerClient } from "@repo/auth/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const noteSchema = z.object({ content: z.string().min(1).max(2000) });

export async function addNote(formData: FormData) {
  const parsed = noteSchema.safeParse({ content: formData.get("content") });
  if (!parsed.success) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }

  // Insert ide kroz Supabase klijent sa JWT-om korisnika — RLS proverava user_id.
  await supabase.from("notes").insert({ content: parsed.data.content, user_id: user.id });
  revalidatePath("/dashboard");
}

export async function deleteNote(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") {
    return;
  }

  const supabase = await createSupabaseServerClient();
  // RLS garantuje da korisnik može da obriše samo svoju belešku.
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/dashboard");
}
