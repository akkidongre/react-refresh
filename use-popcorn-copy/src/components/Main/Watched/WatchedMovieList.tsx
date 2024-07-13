import { WatchedMovieInterface } from "../../../types/WatchedMovieInterface";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({watched, onDelete}: {watched: WatchedMovieInterface[], onDelete: (id: number) => void}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
            ))}
        </ul>
    )
}