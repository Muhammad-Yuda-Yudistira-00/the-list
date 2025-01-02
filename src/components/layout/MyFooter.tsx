import { Footer } from "flowbite-react";
import Link from "next/link"


export default function MyFooter() {
  return (
    <Footer container className="bg-colorPallete-pallete2 rounded-none">
    	<Link href="/">
      		<Footer.Copyright by="The List™" year={2024} className="" />
    	</Link>
      <Footer.LinkGroup>
        <Footer.Link href="mailto:yudistira22112022@gmail.com" className="">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
