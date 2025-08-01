import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AInovalife",
  description: "一个融合科技洞察、个人成长与生活美学的个人博客空间",
  keywords: ["AI", "技术", "成长", "生活", "博客"],
  authors: [{ name: "AInovalife" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "AInovalife",
    description: "一个融合科技洞察、个人成长与生活美学的个人博客空间",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
