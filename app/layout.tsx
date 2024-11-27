import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lateral Flow Test Analyzer",
  description: "Upload and analyze your rapid test results with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} bg-slate-50 antialiased`}
        suppressHydrationWarning
      >
        <div className="flex">
          <div className="relative flex min-h-screen flex-1 flex-col px-4 pb-4">
            <main className="mx-auto w-full max-w-7xl px-4">{children}</main>
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
