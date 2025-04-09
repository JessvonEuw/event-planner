import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import Image from "next/image";
import Logo from "@/assets/plan-pulse.png";
import Link from 'next/link';
import LinkButton from './components/LinkButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Plan your events with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col h-screen">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
