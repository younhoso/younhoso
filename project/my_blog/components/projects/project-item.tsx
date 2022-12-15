import { DataType } from "../../types";

function ProjectItem({properties}: DataType) {

  const title = properties.Name?.title[0]?.plain_text;
  const url = properties.URL?.url;
  const description = properties.Description.rich_text[0]?.plain_text;

  return(
    <div className="p-6 m-3 bg-slate-700 rounded-md">
      <h1>{title}</h1>
      <h3>{description}</h3>
      <a href={url}>바로가기</a>
    </div>
  )
}

export default ProjectItem;