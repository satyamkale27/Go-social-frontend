import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"; // Import the Toaster component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gopher Social - Go Programming Community",
  description:
    "A social platform for Go developers to share knowledge and connect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
