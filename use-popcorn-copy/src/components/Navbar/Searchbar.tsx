import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function Searchbar({ query, setQuery }) {
    const inputElRef = useRef<HTMLInputElement | null>(null);

    useKey("Enter", function () {
        if (document.activeElement === inputElRef.current) return;
        inputElRef.current!.focus();
        setQuery('');
    });

    // useEffect(() => {
    //     function callback(e: KeyboardEvent) {
    //         if (document.activeElement === inputElRef.current) return;

    //         if (e.code === 'Enter') {
    //             inputElRef.current!.focus();
    //             setQuery('');
    //         }
    //     }

    //     document.addEventListener('keydown', callback);
    //     return () => document.removeEventListener('keydown', callback);
    // }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputElRef}
        />
    );
}