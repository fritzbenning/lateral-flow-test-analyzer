import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  // optional: specify weights if you don't want all of them
  // weight: ['400', '500', '700'],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <SidebarProvider>
              <div className="relative flex min-h-screen flex-1 flex-col px-4 pb-4">
                <main className="mx-auto w-full max-w-7xl px-4">
                  {children}
                </main>
              </div>
              {/* <AppSidebar /> */}
            </SidebarProvider>
          </div>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
