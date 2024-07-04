import { MovieInterface } from "../../types/MovieInterface";
import ListBox from "./Movies/ListBox";
import WatchedBox from "./Watched/WatchedBox";

export default function Main({movies}: {movies: MovieInterface[]}) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  )
}