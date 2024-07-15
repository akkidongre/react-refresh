import { Dispatch } from "react";
import { Action } from "../../App";

export default function FinishedScreen({ points, maxPossiblePoints, highestScore, dispatch }: { points: number, maxPossiblePoints: number, highestScore: number, dispatch: Dispatch<Action> }) {
    const percent = Math.round(points / maxPossiblePoints * 100);

    return (
        <>
            <p className="result">You scored <strong>{points}</strong> out of {maxPossiblePoints} ({percent})</p>
            <p className="highscore">Highest score: {highestScore} points</p>
            <button className='btn btn-ui' onClick={() => dispatch({type: 'restart'})}>Restart</button>
        </>
    )
}
