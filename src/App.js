import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./components/MovieCard";
import SearchIcon from './images/search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=fe468ad5';

function App() {

  const [movies , setMovies] = useState([]);
  const [searchItem , setSearchItem] = useState([]);

  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('Spiderman');
  }, [])
  
  return (
    <div className="app">
      <h1>MovieInfos</h1>
      <div className="search">
        <input 
          placeholder="Search for Movies"
          value = {searchItem}
          onChange={(e) => {setSearchItem(e.target.value)}}
        />
        <img 
          src={SearchIcon}
          alt = "Search"
          onClick={() => {searchMovies(searchItem)}}
        />
      </div>

      {
        movies.length > 0 ?
        (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))
            }
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
