import { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@/components/layout/Favicon"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicon />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
