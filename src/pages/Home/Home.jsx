import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./Home.css";
import Card from "../../components/Card/Card";
import MovieList from "../../components/MovieList/MovieList";

const Home = () => {
  const [popularData, setPopularData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=156cf752534c93d2206ccb62c8e20e1c"
      );
      const data = await response.json();
      setPopularData(data.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          autoPlay={true}
          showThumbs={false}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularData.map((movie) => (
            <Link
            key={movie.original_title}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                />
              </div>
              <div className="posterImage_overlay">
                <div className="posterImage_title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage_runtime">
                  {movie ? movie.release_date : ""}
                  <span className="posterImage_rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />
                    {""}
                  </span>
                </div>
                <div className="posterImage_description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};
export default Home;
