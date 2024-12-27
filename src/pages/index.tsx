import { Geist, Geist_Mono } from "next/font/google";
import Jumbotron from "@/components/home/Jumbotron";

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
    <div className="pt-14">
      <Jumbotron />
    </div>
  );
}
