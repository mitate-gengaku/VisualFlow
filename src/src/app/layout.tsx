import { Geist } from "next/font/google";

import type { Metadata } from "next";

import "@/app/globals.css";
import "@xyflow/react/dist/base.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/provider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-screen h-screen overflow-hidden ${geistSans.variable} antialiased`}
      >
        <ThemeProvider>
          <Toaster richColors theme="light" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
