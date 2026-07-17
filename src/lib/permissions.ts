import { NextResponse } from "next/server";
import { auth, canAccessAdmin } from "@/lib/auth";

export async function requireStaff() {
  const session = await auth();
  if (!session?.user || !canAccessAdmin(session.user.role)) {
    return { session: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, error: null };
}
