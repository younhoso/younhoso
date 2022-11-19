import Head from "next/head";

type titleProps = {
	title:string
}

function Seo({title}: titleProps) {
	return(
		<Head>
			<title>{`${title} | Next`}</title>
		</Head>
	)
}

export default Seo;