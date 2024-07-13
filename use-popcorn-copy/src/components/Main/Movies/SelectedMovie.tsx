import { useEffect, useRef, useState } from "react";
import { WatchedMovieInterface } from "../../../types/WatchedMovieInterface";
import StarRating from "../../shared/StarRating";
import Loader from "../../UI/Loader";
import { useKey } from "../../../hooks/useKey";

export default function SelectedMovie({ watched, selectedId, onCloseMovie, onAddToWatched }: { watched: WatchedMovieInterface[], selectedId: number, onCloseMovie: () => void, onAddToWatched: (movie: WatchedMovieInterface) => void }) {
    const [movie, setMovie] = useState<null | WatchedMovieInterface>(null);
    const [userRating, setUserRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const countRef = useRef(0);

    useEffect(() => {
        if (userRating) {
            countRef.current = countRef.current + 1;
        }
    }, [userRating]);

    const isWatched = watched.map(watchedMovie => +watchedMovie.id).includes(+selectedId);
    const rating = watched.find(watchedMovie => +watchedMovie.id === +selectedId)?.userRating || 0;

    const handleAdd = () => {
        const movieData: WatchedMovieInterface = {...movie!};
        movieData.userRating = userRating;
        onAddToWatched(movieData!);
        onCloseMovie();
    }

    const handleSetRating = (rating: number) => {
        setUserRating(rating);
    }

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true);
            
            const res = await fetch(`https://api4.thetvdb.com/v4/movies/${selectedId}/extended?meta=translations&short=true`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOiIiLCJhcGlrZXkiOiJmMGE2ZjdjYy0wNTBlLTQzM2MtODljMy0zMWRlZWEyYmZkNDEiLCJjb21tdW5pdHlfc3VwcG9ydGVkIjpmYWxzZSwiZXhwIjoxNzIzNDc2NzU5LCJnZW5kZXIiOiIiLCJoaXRzX3Blcl9kYXkiOjEwMDAwMDAwMCwiaGl0c19wZXJfbW9udGgiOjEwMDAwMDAwMCwiaWQiOiIyNDcwMjcyIiwiaXNfbW9kIjpmYWxzZSwiaXNfc3lzdGVtX2tleSI6ZmFsc2UsImlzX3RydXN0ZWQiOmZhbHNlLCJwaW4iOiI5MTk3Iiwicm9sZXMiOltdLCJ0ZW5hbnQiOiJ0dmRiIiwidXVpZCI6IiJ9.DbjeYWoeSd-x4ZkCd-c4QEqvwQTL30062FD-HuGCnkjgrRICRe2Yd9HMENTniR0KZVEuC4z7xDJP21TnxeWQnY8JclTl_No_Mf0dfyuTOQG2892OdPm0PmYe4iYJa-hY-nY-NKzEQpfRguV7BukwSL0KEZRcwYXjfe7dk2LT-3yIQEY9o2COxmp7QuTYMZorgzhSufTaDkhRmKO7_KGuFlORSgP5D34gVbuUd4UzQglT9Qy71tcHclNUZ2kadoP-UyeuApY0CnsUwIcKqdNMI6S62fJbPvbsPTpsIteD8_obwBp8UaYGypAY6Ab6Kabqw1Wi2jdtjLYhuPp4cmvIuS4ZgRdwTAgNnHkYjcqNoDi0YOMGOvIGDrvMoe5HskIfxoJ6W5PaXMcjSMXxCUL7L1KlKCt1G0-UFPrhSES-cC95aWnelDdUzFm5SE7JKdxv_D5xXv_lfL0TiKytOiMIjyB60DLtXsxUUcjvilAyzRyy9vpB5bGsnwkrdpgZMV8JunTzmMO3Kgr2sD6Ku0aR7sub4OAh-sptRGQtNaTNQjvDucst960DcjB3i2qg2qQ9D2YvihEjKzS57q_GxcuLtHEyfqPTmtjn0BXKB2jXX8eZWc2gnBP6MY59EbXlkoBQqCrUsEs2dzDPmgslkQk4ma7EBDYcsaBqGjqGlveYneI`
                }
            });

            const data = await res.json();
            const movieData: WatchedMovieInterface = {
                id: data.data.id,
                Title: data.data.name,
                Year: data.data.year,
                Poster: data.data.image,
                runtime: data.data.runtime,
                imdbID: data.data.id.toString(),
                imdbRating: 0,
                userRating: 0,
                description: data.data.translations.overviewTranslations[0].overview
            };
            setMovie(movieData);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        document.title = movie?.Title || 'usePopcorn';

        return () => {
            document.title = 'usePopcorn';
        }
    }, [movie]);

    useKey('Escape', onCloseMovie);

    // useEffect(() => {
    //     const keydownCallback = (e: KeyboardEvent) => {
    //         if (e.key === 'Escape') {
    //           onCloseMovie();
    //         }
    //     }

    //     document.addEventListener('keydown', keydownCallback);

    //     return () => {
    //         document.removeEventListener('keydown', keydownCallback);
    //     }
    //   }, [onCloseMovie]);

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading && movie && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={movie.Poster} alt="" />
                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>{movie.Year} &bull; {movie.runtime}</p>
                            <p>Genres</p>
                            <p>IMDB rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched && (
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={handleSetRating} />
                                    {userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add to list</button>}
                                </>
                            )}
                            {isWatched && (
                                <>
                                    <p>You watched thsi movie</p>
                                    <p>Your ratings: {rating}</p>
                                </>
                            )}
                        </div>
                        <p><em>{movie?.description}</em></p>
                    </section>
                </>
            )}
        </div>
    );
}