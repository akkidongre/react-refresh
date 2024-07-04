import { MovieInterface } from "./MovieInterface";

export interface WatchedMovieInterface extends MovieInterface {
    imdbRating: number;
    userRating: number;
    runtime: number;
}