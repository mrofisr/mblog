"use client";

import { ThemeProvider } from "next-themes";
import "./globals.css";
import { initUmami } from "@/lib/umami";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    initUmami(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "http://localhost:3000/script.js", process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "00000000-0000-0000-0000-000000000000");
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
