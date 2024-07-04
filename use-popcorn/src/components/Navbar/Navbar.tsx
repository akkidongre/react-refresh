import { MovieInterface } from "../../types/MovieInterface";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Searchbar from "./Searchbar";

export default function Navbar({movies}: {movies: MovieInterface[]}) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Searchbar />
            <NumResults movies={movies} />
        </nav>
    )
}