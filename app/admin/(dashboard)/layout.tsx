import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      <AdminSidebar userRole={session.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={session} />
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

