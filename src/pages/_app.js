import { ThemeProvider } from "next-themes";
import "../app/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;