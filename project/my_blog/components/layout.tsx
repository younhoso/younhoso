import Footer from "./footer";
import Header from "./header";
import { Props } from "../types";

function Layout({ children }: Props){
	return(
		<>
			<Header />
			<h1>레이어 아웃</h1>
			<div>{children}</div>
			<Footer />
		</>
	)
}

export default Layout;