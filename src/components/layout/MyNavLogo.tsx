import Image from 'next/image';
import { cherryCreamSoda } from "@/libs/googleFonts/fontsStyle"
import Link from "next/link"

export default function MyNavLogo () {
	return (
		<>
			<div className="w-full h-14 bg-colorPallete-pallete4 text-center font-extralight">
		        <h1 className={`text-6xl text-logoColor capitalize ${cherryCreamSoda.className} py-3`}>
		        	<Link href="/">The list</Link>
		        </h1>
		    </div>
		</>
		)
}