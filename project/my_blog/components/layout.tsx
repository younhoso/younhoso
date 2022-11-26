import Footer from "./footer";
import Header from "./header";

interface LayoutProps  { 
	children: React.ReactNode
}

function Layout({ children }: LayoutProps){
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