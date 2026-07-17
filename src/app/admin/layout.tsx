import Link from "next/link";
import { auth, canAccessAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || !canAccessAdmin(session.user.role)) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b border-line bg-bg-elevated">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Newsroom</p>
            <h1 className="font-serif text-2xl font-bold">Admin</h1>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/admin" className="no-underline hover:text-brand">Dashboard</Link>
            <Link href="/admin/articles" className="no-underline hover:text-brand">Articles</Link>
            <Link href="/admin/events" className="no-underline hover:text-brand">Events</Link>
            <Link href="/" className="no-underline hover:text-brand">View site</Link>
          </nav>
        </div>
      </div>
      <div className="container py-8">{children}</div>
    </div>
  );
}
