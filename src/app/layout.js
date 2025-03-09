import { ThemeProvider } from "next-themes";
import UmamiScript from "@/components/custom/umami";
import "./globals.css";

const RootLayout = ({ children }) => {
  const umamiConfig = {
    scriptUrl: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://umami.is/script.js",
    websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "00000000-0000-0000-0000-000000000000",
  };

  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className="scroll-smooth"
    >
      <head>
        <UmamiScript {...umamiConfig} />
      </head>
      <body>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
