import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Alert } from "flowbite-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Alert color="info">page success</Alert>
    </div>
  );
}
