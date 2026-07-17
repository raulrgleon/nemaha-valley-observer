export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminHomePage() {
  return (
    <div>
      <PageHeader title="Editorial dashboard" description="Manage stories, events, and publishing workflow." />
      <AdminDashboard />
    </div>
  );
}
