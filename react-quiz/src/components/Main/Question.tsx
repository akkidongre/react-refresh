import { Dispatch } from "react"
import { Action, Question as QuestionType } from "../../App"
import Options from "./Options"

export default function Question({question, dispatch, answer}: {question: QuestionType, dispatch: Dispatch<Action>, answer: number | null}) {
  return (
    <div>
        <h4>{question.question}</h4>
        <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}
