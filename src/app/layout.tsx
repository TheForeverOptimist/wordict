import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ToastContainer from "./components/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordict App",
  description: "The word puzzle with actual words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          "min-h-sreen font-sans antialiased grainy",
          inter.className
        )}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
