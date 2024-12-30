import { Footer } from "flowbite-react";
import Link from "next/link"

export default function MyFooter() {
  return (
    <Footer container>
    	<Link href="/">
      		<Footer.Copyright by="The List™" year={2024} />
    	</Link>
      <Footer.LinkGroup>
        <Footer.Link href="mailto:yudistira22112022@gmail.com">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
