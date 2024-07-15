import { Dispatch } from "react"
import { Action, Question as QuestionType } from "../../App"

export default function Options({ question, dispatch, answer }: { question: QuestionType, dispatch: Dispatch<Action>, answer: number | null }) {
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, i) => (
                <button 
                    className={`btn btn-option ${i === answer ? 'answer' : ''} ${hasAnswered ? (i === question.correctOption) ? 'correct' : 'wrong' : ''}`} 
                    key={option} 
                    disabled={hasAnswered}
                    onClick={() => dispatch({type: 'newAnswer', payload: i})}
                >{option}</button>
            ))}
        </div>
    )
}
