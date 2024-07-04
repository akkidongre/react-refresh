import { useState } from "react";
import MovieList from "./MovieList";
import { MovieInterface } from "../../../types/MovieInterface";

export default function ListBox({movies}: {movies: MovieInterface[]}) {
    const [isOpen1, setIsOpen1] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen1 ? "–" : "+"}
            </button>
            {isOpen1 && <MovieList movies={movies} />}
        </div>
    )
}