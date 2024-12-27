import MyNavbar from "@/components/layout/MyNavbar"
import MyFooter from "@/components/layout/MyFooter"

export default function ShellApp({children}) {
	return (
		<div className="container-fluid">
	      <div className="w-full fixed">
	        <MyNavbar />
	      </div>
	      <div className="m-auto min-h-screen">
	        {children}
	      </div>
	      <MyFooter />
	    </div>
		)
}