
import { ThemeProvider } from "next-themes";
import "./globals.css";
import UmamiScript from "@/components/custom/umami";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <UmamiScript scriptUrl={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL} websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
