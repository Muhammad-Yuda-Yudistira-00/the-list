import { Footer } from "flowbite-react";
import Link from "next/link"

export default function MyFooter() {
  return (
    <Footer container>
    	<Link href="/">
      		<Footer.Copyright by="The List™" year={2024} />
    	</Link>
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
