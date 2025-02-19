import { Analytics } from "@vercel/analytics/react";
import { Geist } from "next/font/google";
import { cookies } from "next/headers";

import type { Metadata } from "next";

import "@/app/globals.css";
import "@xyflow/react/dist/base.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisualFlow",
  description:
    "A ReactFlow based application for visually designing and generating GitHub Actions workflow files. You can easily design workflows by simply connecting nodes, and download the YAML file.",
  metadataBase: new URL("https://visualflow.net"),
  openGraph: {
    title: "VisualFlow",
    description:
      "A ReactFlow based application for visually designing and generating GitHub Actions workflow files. You can easily design workflows by simply connecting nodes, and download the YAML file.",
    url: "https://visualflow.net",
    siteName: "VisualFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "VisualFlow",
    description:
      "A ReactFlow based application for visually designing and generating GitHub Actions workflow files. You can easily design workflows by simply connecting nodes, and download the YAML file.",
    creator: "@mitate-gengaku",
    creatorId: "1776914915519045632",
  },
  authors: [{ name: "Mitate Gengaku", url: "https://mitate-gengaku.com" }],
  generator: "Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-screen h-screen overflow-hidden ${geistSans.variable} antialiased`}
      >
        <ThemeProvider>
          <Toaster richColors theme="light" />
          <SidebarProvider className="w-full h-full" defaultOpen={defaultOpen}>
            {children}
          </SidebarProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
