import { MovieInterface } from "../../../types/MovieInterface";

export default function Movie({movie, onSelectMovie}: {movie: MovieInterface, onSelectMovie: (id: number) => void}) {
    return (
        <li onClick={() => onSelectMovie(movie.id)} key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}