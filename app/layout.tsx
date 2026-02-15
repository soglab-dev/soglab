import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soglab - AI, Games, Software Innovation",
  description: "Soglab delivers cutting-edge technology solutions in AI, game development, and software consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
