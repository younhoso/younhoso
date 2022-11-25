
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Seo from "../components/Seo";

function Home({results}) {
  const router = useRouter();

  const handleClick = (id, title) => () => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <HomeWraper>
      <Seo title="Home" />
      {results?.map((item) => (
        <div onClick={handleClick(item.id, item.original_title)} key={item.id}>
          <div className="movie" key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
            <h4>
              <Link href={`/movies/${item.original_title}/${item.id}`}>
                <a>{item.original_title}</a>
              </Link>
            </h4>
          </div>
        </div>
      ))}
    </HomeWraper>
  );
};

const HomeWraper = styled.div`
  max-width: 680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  gap: 20px;
  
  .movie img {
    max-width: 100%;
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  .movie:hover img {
    transform: scale(1.05) translateY(-10px);
  }
  .movie h4 {
    font-size: 18px;
    text-align: center;
  }
`;

export async function getServerSideProps() {
  const {results} = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json()
  return {
    props: {
      results
    }
  }
}

export default Home;