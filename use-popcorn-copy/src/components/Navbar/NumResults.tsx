import { MovieInterface } from "../../types/MovieInterface";

export default function NumResults({ movies }: { movies: MovieInterface[] }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}