import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 热点单篇改写工作台",
  description: "把单条 AI 热点新闻改写成微信公众号单篇草稿。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
