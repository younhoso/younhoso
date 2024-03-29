import Seo from "../../components/Seo";
import styled from "styled-components";

function Detail({params}) {
  const [title, id] = params || [];
  return (
    <DetailWraper>
      <Seo title={title}></Seo>
      <h4>{title}</h4>
    </DetailWraper>
  )
};

const DetailWraper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`


export function getServerSideProps({params: {params}}) {
  return {
    props: {
      params
    }
  }
}

export default Detail;