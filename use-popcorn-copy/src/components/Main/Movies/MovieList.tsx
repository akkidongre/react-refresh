import Movie from "./Movie";
import { MovieInterface } from "../../../types/MovieInterface";

export default function MovieList({ movies, onSelectMovie }: { movies: MovieInterface[], onSelectMovie: (id: number) => void }) {

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} onSelectMovie={onSelectMovie} movie={movie} />
      ))}
    </ul>
  );
}