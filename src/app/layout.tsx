import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from '../components/Nav'; 
import { Toaster } from "@/components/ui/toaster";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projection",
  description: "AI prediction model",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          <Toaster />
          <div className="">
            {children}
          </div>
        </body>
      </html>
    );
  } catch (error) {
    console.error('Error in RootLayout:', error);
    return (
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          <Toaster />
          <div className="">
            {children}
          </div>
        </body>
      </html>
    );
  }
}
