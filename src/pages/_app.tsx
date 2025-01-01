import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ShellApp from "@/components/layout/ShellApp";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ShellApp>
        <Component {...pageProps} />
      </ShellApp>
    </DndProvider>
  );
}
