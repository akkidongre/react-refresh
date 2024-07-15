import { Dispatch } from 'react'
import { Action } from '../../App'

export default function NextButton({answer, dispatch}: {answer: number | null, dispatch: Dispatch<Action>}) {
    if (answer === null) {
        return null;
    }
    return <button className='btn btn-ui' onClick={() => dispatch({type: 'nextQuestion'})}>Next</button>
}
