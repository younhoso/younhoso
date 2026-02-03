import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter Kit",
  description: "A modern Next.js starter kit with TypeScript, Tailwind CSS, and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="min-h-screen bg-gradient-to-b from-background to-muted">
          {children}
        </main>
      </body>
    </html>
  );
}
