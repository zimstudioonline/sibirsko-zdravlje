"use client";

import { Button, Input, Label, Textarea } from "@repo/ui";
import { Markdown } from "@tiptap/markdown";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  type LucideIcon,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import "./post-editor.css";

export interface EditablePost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
}

interface ToolbarAction {
  label: string;
  icon: LucideIcon;
  isActive?: (editor: Editor) => boolean;
  run: (editor: Editor) => void;
}

const TOOLBAR: ToolbarAction[] = [
  {
    label: "Podebljano",
    icon: Bold,
    isActive: (e) => e.isActive("bold"),
    run: (e) => e.chain().focus().toggleBold().run(),
  },
  {
    label: "Kurziv",
    icon: Italic,
    isActive: (e) => e.isActive("italic"),
    run: (e) => e.chain().focus().toggleItalic().run(),
  },
  {
    label: "Precrtano",
    icon: Strikethrough,
    isActive: (e) => e.isActive("strike"),
    run: (e) => e.chain().focus().toggleStrike().run(),
  },
  {
    label: "Naslov 2",
    icon: Heading2,
    isActive: (e) => e.isActive("heading", { level: 2 }),
    run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: "Naslov 3",
    icon: Heading3,
    isActive: (e) => e.isActive("heading", { level: 3 }),
    run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    label: "Lista",
    icon: List,
    isActive: (e) => e.isActive("bulletList"),
    run: (e) => e.chain().focus().toggleBulletList().run(),
  },
  {
    label: "Numerisana lista",
    icon: ListOrdered,
    isActive: (e) => e.isActive("orderedList"),
    run: (e) => e.chain().focus().toggleOrderedList().run(),
  },
  {
    label: "Citat",
    icon: Quote,
    isActive: (e) => e.isActive("blockquote"),
    run: (e) => e.chain().focus().toggleBlockquote().run(),
  },
  {
    label: "Blok koda",
    icon: Code,
    isActive: (e) => e.isActive("codeBlock"),
    run: (e) => e.chain().focus().toggleCodeBlock().run(),
  },
  { label: "Poništi", icon: Undo2, run: (e) => e.chain().focus().undo().run() },
  { label: "Ponovi", icon: Redo2, run: (e) => e.chain().focus().redo().run() },
];

/**
 * Forma objave sa TipTap markdown editorom. Editor drži sadržaj kao rich
 * text, a u formu (hidden input) ide `editor.getMarkdown()` — u bazi je
 * uvek čist markdown.
 */
export function PostEditor({
  action,
  post,
}: {
  action: (formData: FormData) => Promise<void>;
  post?: EditablePost;
}) {
  const [content, setContent] = useState(post?.content ?? "");
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: post?.content ?? "",
    contentType: "markdown",
    // Next SSR: editor se montira tek na klijentu (izbegava hydration mismatch).
    immediatelyRender: false,
    // Toolbar čita isActive stanje — rerender po transakciji je ovde namerno.
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor: current }) => setContent(current.getMarkdown()),
  });

  return (
    <form action={action} className="space-y-6">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <input type="hidden" name="content" value={content} />

      <div className="space-y-2">
        <Label htmlFor="title">Naslov</Label>
        <Input id="title" name="title" required maxLength={200} defaultValue={post?.title} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          maxLength={200}
          defaultValue={post?.slug}
          placeholder="prazno = iz naslova"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Opis (za listu i meta tagove)</Label>
        <Textarea
          id="description"
          name="description"
          rows={2}
          maxLength={500}
          defaultValue={post?.description}
        />
      </div>

      <div className="space-y-2">
        <Label>Tekst</Label>
        <div className="post-editor rounded-md border">
          <div className="flex flex-wrap items-center gap-1 border-b p-1">
            {TOOLBAR.map((tool) => (
              <Button
                key={tool.label}
                type="button"
                variant={editor && tool.isActive?.(editor) ? "secondary" : "ghost"}
                size="sm"
                aria-label={tool.label}
                title={tool.label}
                disabled={!editor}
                onClick={() => editor && tool.run(editor)}
              >
                <tool.icon className="size-4" />
              </Button>
            ))}
          </div>
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm" htmlFor="published">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={post?.published ?? false}
            className="size-4 accent-primary"
          />
          Objavljeno (vidljivo na sajtu)
        </label>
        <Button type="submit">Sačuvaj</Button>
      </div>
    </form>
  );
}
