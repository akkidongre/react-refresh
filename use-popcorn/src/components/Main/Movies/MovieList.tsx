import Movie from "./Movie";
import { MovieInterface } from "../../../types/MovieInterface";

export default function MovieList({ movies }: { movies: MovieInterface[] }) {

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}