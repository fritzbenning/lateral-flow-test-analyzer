import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lateral Flow Test Analyzer - How it works",
  description:
    "With our trained neural network, we can analyse your lateral flow test in just one click. Learn more!",
  openGraph: {
    title: "Lateral Flow Test Analyzer - How it works",
    description:
      "With our trained neural network, we can analyse your lateral flow test in just one click. Learn more!",
    images: [
      {
        url: "/thumbnail/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lateral Flow Test Analyzer Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lateral Flow Test Analyzer - How it works",
    description:
      "With our trained neural network, we can analyse your lateral flow test in just one click. Learn more!",
    images: ["/thumbnail/og-image.png"],
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
