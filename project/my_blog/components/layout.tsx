import Footer from "./Footer";
import Header from "./Header";
import { Props } from "../types";

function Layout({ children }: Props){
	return(
		<>
			<Header />
			<div className="flex flex-wrap container mx-auto">{children}</div>
			<Footer />
		</>
	)
}

export default Layout;