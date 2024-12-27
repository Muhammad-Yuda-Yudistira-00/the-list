import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ShellApp from "@/components/layout/ShellApp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShellApp>
      <Component {...pageProps} />
    </ShellApp>
  );
}
