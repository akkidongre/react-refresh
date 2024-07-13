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
import { MovieInterface } from "./types/MovieInterface";

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [watched, setWatched] = useState<WatchedMovieInterface[]>([]);
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectMovie = (id: number) => {
    setSelectedId((currId) => currId === id ? null : id);
  }

  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  const handleAddToWatched = (movie: WatchedMovieInterface) => {
    setWatched((prevWatched) => [...prevWatched, movie]);
  }

  const handleDeleteWatched = (id: number) => {
    setWatched((prevWatched) => prevWatched.filter((movie) => +movie.id !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`https://api4.thetvdb.com/v4/search?query=${query}&limit=10&type=movie`, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOiIiLCJhcGlrZXkiOiJmMGE2ZjdjYy0wNTBlLTQzM2MtODljMy0zMWRlZWEyYmZkNDEiLCJjb21tdW5pdHlfc3VwcG9ydGVkIjpmYWxzZSwiZXhwIjoxNzIzNDc2NzU5LCJnZW5kZXIiOiIiLCJoaXRzX3Blcl9kYXkiOjEwMDAwMDAwMCwiaGl0c19wZXJfbW9udGgiOjEwMDAwMDAwMCwiaWQiOiIyNDcwMjcyIiwiaXNfbW9kIjpmYWxzZSwiaXNfc3lzdGVtX2tleSI6ZmFsc2UsImlzX3RydXN0ZWQiOmZhbHNlLCJwaW4iOiI5MTk3Iiwicm9sZXMiOltdLCJ0ZW5hbnQiOiJ0dmRiIiwidXVpZCI6IiJ9.DbjeYWoeSd-x4ZkCd-c4QEqvwQTL30062FD-HuGCnkjgrRICRe2Yd9HMENTniR0KZVEuC4z7xDJP21TnxeWQnY8JclTl_No_Mf0dfyuTOQG2892OdPm0PmYe4iYJa-hY-nY-NKzEQpfRguV7BukwSL0KEZRcwYXjfe7dk2LT-3yIQEY9o2COxmp7QuTYMZorgzhSufTaDkhRmKO7_KGuFlORSgP5D34gVbuUd4UzQglT9Qy71tcHclNUZ2kadoP-UyeuApY0CnsUwIcKqdNMI6S62fJbPvbsPTpsIteD8_obwBp8UaYGypAY6Ab6Kabqw1Wi2jdtjLYhuPp4cmvIuS4ZgRdwTAgNnHkYjcqNoDi0YOMGOvIGDrvMoe5HskIfxoJ6W5PaXMcjSMXxCUL7L1KlKCt1G0-UFPrhSES-cC95aWnelDdUzFm5SE7JKdxv_D5xXv_lfL0TiKytOiMIjyB60DLtXsxUUcjvilAyzRyy9vpB5bGsnwkrdpgZMV8JunTzmMO3Kgr2sD6Ku0aR7sub4OAh-sptRGQtNaTNQjvDucst960DcjB3i2qg2qQ9D2YvihEjKzS57q_GxcuLtHEyfqPTmtjn0BXKB2jXX8eZWc2gnBP6MY59EbXlkoBQqCrUsEs2dzDPmgslkQk4ma7EBDYcsaBqGjqGlveYneI`
          },
          signal: controller.signal
        });

        if (!res.ok) {
          throw new Error('Something went wrong');
        }

        const data = await res.json();

        if (!data || !data.data || data.data.length === 0) {
          throw new Error('Failed to fetch movies');
        }

        const moviesData = data.data.map((movie: any) => {
          return {
            imdbID: movie.id,
            Title: movie.name,
            Year: movie.year,
            Poster: movie.image_url,
            id: +movie.tvdb_id
          }
        });
        setMovies(moviesData);
      } catch(err: Error | any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
    } else {
      handleCloseMovie();
      fetchMovies();
    }

    return () => {
      controller.abort();
    }
  }, [query]);

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
