import { SessionProvider } from "next-auth/react"
import "/styles/globals.css";
import { ThemeProvider } from "./MTailwind";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}