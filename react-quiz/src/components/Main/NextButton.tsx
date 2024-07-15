import { Dispatch } from 'react'
import { Action } from '../../App'

export default function NextButton({answer, index, numQuestions, dispatch}: {answer: number | null, index: number, numQuestions: number, dispatch: Dispatch<Action>}) {
    if (answer === null) {
        return null;
    }
    
    if (index < numQuestions - 1) {
        return <button className='btn btn-ui' onClick={() => dispatch({type: 'nextQuestion'})}>Next</button>
    }

    return <button className='btn btn-ui' onClick={() => dispatch({type: 'finish'})}>Finish</button>
}
