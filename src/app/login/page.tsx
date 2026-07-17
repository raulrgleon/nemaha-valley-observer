import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Sign In"
        description="Staff accounts use Auth.js credentials. Demo editor is seeded on deploy."
      />
      <Suspense fallback={<p className="text-ink-muted">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
