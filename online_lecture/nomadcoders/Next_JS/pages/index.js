import { useEffect, useState } from "react";
import styled from "styled-components";
import Seo from "../components/Seo";


const API_KEY = "f5a3aa1ea818b84c6576fe57c931c31e";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
        const {results} = await (
          await fetch(`/api/movies`
          )
        ).json();
        setMovies(results)
    })()
  },[])

  return (
    <HomeWraper>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((item) => (
        <div key={item.id}>
          <div className="movie" key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
            <h4>{item.original_title}</h4>
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

export default Home;