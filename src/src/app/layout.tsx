import type { Metadata } from "next";
import { Geist, Noto_Sans_JP } from "next/font/google";
import "./globals.css"
import "@xyflow/react/dist/base.css"
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visual Flow | Create & Visualize Github Actions Workflow",
  description: "Github Actionsのワークフローファイルを視覚的に設計・生成できるReact Flowベースのアプリケーションです。各ノードを接続するだけで簡単にワークフローを設計することができ、YAMLファイルをダウンロードすることができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen overflow-hidden ${geistSans.variable} ${notoSansJP.variable} antialiased`}
      >
        <Toaster 
          richColors
          theme="light"
          />
        {children}
      </body>
    </html>
  );
}
