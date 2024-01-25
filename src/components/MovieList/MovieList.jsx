import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./MovieList.css";
import { useParams } from "react-router-dom";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=156cf752534c93d2206ccb62c8e20e1c`
    );
    const data = await response.json();
    setMovieList(data.results);
  };

  return (
    <div className="movie_list">
      <h2 className="list_title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list_cards">
        {movieList.map((movie) => (
          <Card key={movie.original_title} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default MovieList;
