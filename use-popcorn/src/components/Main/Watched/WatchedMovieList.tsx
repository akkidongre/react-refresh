import { WatchedMovieInterface } from "../../../types/WatchedMovieInterface";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({watched}: {watched: WatchedMovieInterface[]}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}