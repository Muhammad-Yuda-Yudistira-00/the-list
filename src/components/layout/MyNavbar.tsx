import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
// import Link from "next/link";
import Image from 'next/image';
// import { useRouter } from "next/router";

export default function MyNavbar() {
  // const {pathname} = useRouter()
  return (
    <Navbar fluid rounded className="">
      <NavbarBrand href="/">
        <div className="w-6 h-6 bg-black rounded-full overflow-hidden relative mr-2">
          <Image src="/image/the-list-logo.png" className="mr-3 h-6 sm:h-9 w-6" alt="the list Logo" layout="fill"objectFit="cover" />
        </div>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-gray-700">The List</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {/* style css for active link */}
        {/* "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" */}
        {/*<Link href="mailto:yudistira22112022@gmail.com" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
          Contact
        </Link>*/}
      </NavbarCollapse>
    </Navbar>
  );
}
