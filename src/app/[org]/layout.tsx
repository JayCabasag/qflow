import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export default async function OrgLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ org: string }>;
}>) {
  const { org } = await params;
  return (
    <div className="min-h-screen bg-background">
      <Navbar org={org} />
      <main className="container mx-auto px-6 py-4">{children}</main>
      <Toaster />
    </div>
  );
}
