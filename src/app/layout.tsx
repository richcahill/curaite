import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationBar from "@/components/navigation-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Curaite",
  description: "Generate portfolios and case studies from your work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen w-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationBar />
        <div className="flex-grow overflow-y-auto">{children}</div>
      </body>
    </html>
  );
}
