import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SnapFlow",
    default: "SnapFlow",
  },
  description: "Social Meida website built in NextJS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <div>
          <div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
