import { Footer } from "flowbite-react";
import Link from "next/link"


export default function MyFooter() {
  return (
    <Footer container className="bg-gradient-to-b from-blue-700 to-blue-400 rounded-none">
    	<Link href="/">
      		<Footer.Copyright by="The List™" year={2024} className="text-blue-400 px-2 bg-stone-700" />
    	</Link>
      <Footer.LinkGroup>
        <Footer.Link href="mailto:yudistira22112022@gmail.com" className="text-logoColor uppercase">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
