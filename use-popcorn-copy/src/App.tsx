import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import NumResults from "./components/Navbar/NumResults";
import Searchbar from "./components/Navbar/Searchbar";
import MovieList from "./components/Main/Movies/MovieList";
import Box from "./components/Main/Box";
import WatchedSummary from "./components/Main/Watched/WatchedSummary";
import WatchedMovieList from "./components/Main/Watched/WatchedMovieList";
import { WatchedMovieInterface } from "./types/WatchedMovieInterface";
import Loader from "./components/UI/Loader";
import ErrorMessage from "./components/UI/ErrorMessage";
import SelectedMovie from "./components/Main/Movies/SelectedMovie";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState<WatchedMovieInterface[]>([], 'watchedMovies');

  const handleSelectMovie = (id: number) => {
    setSelectedId((currId) => currId === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddToWatched = (movie: WatchedMovieInterface) => {
    setWatched((prevWatched) => [...prevWatched, movie]);
  }

  const handleDeleteWatched = (id: number) => {
    setWatched((prevWatched) => prevWatched.filter((movie) => +movie.id !== id));
  }

  return (
    <>
      <Navbar>
        <Searchbar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList 
            movies={movies} 
            onSelectMovie={handleSelectMovie}
          />}
        </Box>
        <Box>
          {selectedId ? <SelectedMovie 
              watched = {watched}
              selectedId={selectedId} 
              onCloseMovie={handleCloseMovie}
              onAddToWatched={handleAddToWatched} 
            /> : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
