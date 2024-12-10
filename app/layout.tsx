import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Scan your test - Lateral Flow Test Analyzer",
  description:
    "Analyse your lateral flow test in seconds. Manual analysis is a thing of the past. Easy and free of charge!",
  openGraph: {
    title: "Lateral Flow Test Analyzer - Scan your test!",
    description:
      "Analyse your lateral flow test in seconds. Manual analysis is a thing of the past. Easy and free of charge!",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/thumbnail/lateral-flow-test-analyzer-thumbnail.jpg`,
        width: 1200,
        height: 630,
        alt: "Lateral Flow Test Analyzer Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lateral Flow Test Analyzer - Scan your test!",
    description:
      "Analyse your lateral flow test in seconds. Manual analysis is a thing of the past. Easy and free of charge!",
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/thumbnail/lateral-flow-test-analyzer-thumbnail.jpg`,
    ],
  },
  icons: {
    icon: [
      { url: "favicon/favicon.ico" },
      { url: "favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "favicon/favicon-512x512.png",
    apple: [{ url: "favicon/favicon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
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
          <div className="relative flex min-h-screen flex-1 flex-col">
            <main className="mx-auto w-full max-w-6xl">{children}</main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
