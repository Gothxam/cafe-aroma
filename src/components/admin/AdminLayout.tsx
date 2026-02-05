import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-6 hidden md:block">
        <h2 className="mb-6 text-lg font-semibold">Admin Panel</h2>
        <nav className="space-y-3 text-sm">
          <Link href="/admin/menu" className="block hover:text-primary">
            Menu
          </Link>
          <Link href="/admin/events" className="block hover:text-primary">
            Events
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
