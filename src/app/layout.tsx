import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "QFlow - Effortless Queue Management, Anywhere.",
  description:
    "QFlow is a smart online queuing system with QR code check-in, real-time updates, and digital queue management for businesses of any size.",
  icons: {
    icon: "/qline-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
