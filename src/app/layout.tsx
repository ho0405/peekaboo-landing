import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peekaboo-daol.vercel.app"),
  title: "Peekaboo – See through the web",
  description: "See through the web. A transparent browser window for viewing web pages while working with other apps. Mac & Windows.",
  openGraph: {
    title: "Peekaboo – See through the web",
    description: "See through the web. A transparent browser window for viewing web pages while working with other apps. Mac & Windows.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peekaboo – See through the web",
    description: "See through the web. A transparent browser window for viewing web pages while working with other apps. Mac & Windows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
