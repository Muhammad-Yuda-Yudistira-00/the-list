// import MyNavbar from "@/components/layout/MyNavbar"
import MyNavLogo from "@/components/layout/MyNavLogo"
import MyFooter from "@/components/layout/MyFooter"

export default function ShellApp({children}: {children: React.ReactNode}) {
	return (
		<div className="container-fluid">
	      <div className="w-full fixed">
	        {/*<MyNavbar />*/}
	      	<MyNavLogo />
	      </div>
	      <div className="m-auto min-h-screen">
	        {children}
	      </div>
	      <MyFooter />
	    </div>
		)
}