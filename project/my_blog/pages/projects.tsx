import Layout from "../components/Layout";
import ProjectItem from "../components/projects/project-item";
import Seo from "../components/Seo";
import { DATABASE_ID, TOKEN } from '../config'
import { DataTypeResults, DataType } from "../types";


function Projects({results}: DataTypeResults) {

	return(
		<Layout>
			<Seo title="프로젝트"/>
			<h1>총 프로젝트: {results.length}</h1>
			<div>
			{results.map(({id, properties}:DataType) => {
				return (
					<div key={id}>
						<ProjectItem properties={properties}/>
					</div>
				);
			})}
			</div>
		</Layout>
	)
}

// 빌드 타임에 호출이 딱 한번 됩니다.
export async function getStaticProps() {
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Notion-Version': '2022-06-28',
			'content-type': 'application/json',
			Authorization: `Bearer ${TOKEN}`
		},
		body: JSON.stringify({
				page_size: 100,
				sorts: [{
					"property": "Name",
					"direction": "ascending"
				}]
			})
	};
	
	const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)
	const {results} = await res.json();

  return {
    props: {results}, // will be passed to the page component as props
  }
}

export default Projects;