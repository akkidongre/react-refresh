export default function WatchedMovie({movie, onDelete}: {movie: any, onDelete: (id: number) => void}) {
    return (
        <li>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                        <p>
                            <span>⭐️</span>
                            <span>{movie.imdbRating}</span>
                        </p>
                        <p>
                            <span>🌟</span>
                            <span>{movie.userRating}</span>
                        </p>
                        <p>
                            <span>⏳</span>
                            <span>{movie.runtime} min</span>
                        </p>

                        <button className="btn-delete" onClick={() => onDelete(movie.id)}>X</button>
                    </div>
                </li>
    )
}