import { Footer } from "flowbite-react";
import Link from "next/link"


export default function MyFooter() {
  return (
    <Footer container className="bg-gradient-to-b from-blue-700 to-blue-400 rounded-none">
    	<Link href="/">
      		<Footer.Copyright by="The List™" year={2024} className="text-stone-800" />
    	</Link>
      <Footer.LinkGroup>
        <Footer.Link href="mailto:yudistira22112022@gmail.com" className="text-stone-800">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
