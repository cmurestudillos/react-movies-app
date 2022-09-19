import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e21f7f3e901dfcfcecfbdce8b24628ff";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=e21f7f3e901dfcfcecfbdce8b24628ff&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      getMovies(`${SEARCH_API}${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  return (
    <>
      <header>
        <h1 className="title">Movies App</h1>
        <form className="searchform" onSubmit={handleOnSubmit}>
          <input
            type="search"
            className="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
