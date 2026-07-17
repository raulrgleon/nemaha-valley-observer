"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export function ArticleEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-64 rounded border border-line bg-bg-elevated px-3 py-2 prose-article focus:outline-none",
      },
    },
  });

  if (!editor) return <div className="min-h-64 animate-pulse rounded bg-bg-muted" />;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {(
          [
            ["Bold", () => editor.chain().focus().toggleBold().run()],
            ["Italic", () => editor.chain().focus().toggleItalic().run()],
            ["H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
            ["Quote", () => editor.chain().focus().toggleBlockquote().run()],
            ["List", () => editor.chain().focus().toggleBulletList().run()],
          ] as const
        ).map(([label, action]) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="rounded border border-line px-2 py-1 text-xs font-semibold"
          >
            {label}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
