import { Dispatch, useEffect } from "react"
import { Action } from "../../App";

export default function Timer({secondsRemaining, dispatch}: {secondsRemaining: number, dispatch: Dispatch<Action>}) {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'tick'});
        }, 1000);

        return () => {
            clearInterval(id);
        }
    }, [dispatch]);

    return <div className="timer">{mins < 10 && "0"}{mins}:{secs < 10 && "0"}{secs}</div>
}