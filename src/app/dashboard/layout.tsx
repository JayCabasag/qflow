import { AdminNavbar } from "@/components/admin-navbar";
import { getCurrentUser } from "../auth/actionssa";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar user={user} notifications={10} email={user?.email ?? ""} />
      {children}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="h-3 w-3 bg-green-500"></div>
            <span>Secure and reliable queue management system</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
