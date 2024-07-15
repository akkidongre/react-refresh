import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/Main/StartScreen";
import Question from "./components/Main/Question";
import NextButton from "./components/Main/NextButton";
import Progress from "./components/Main/Progress/Progress";

export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export type State = {
  questions: Question[],
  index: number,
  answer: number | null,
  points: number,
  status: 'loading' | 'ready' | 'error' | 'active' | 'finished'
}

export type Action = {type: string, payload?: any};

const initialState: State = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  status: 'loading'
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived': 
      return {...state, questions: action.payload, status: 'ready'};
    case 'dataFailed': {
      return {...state, status: 'error'};
    }
    case 'start': {
      return {...state, status: 'active'}
    }
    case 'newAnswer': {
      const question = state.questions[state.index];

      return {
        ...state, 
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };
    }
    case 'nextQuestion': {
      return {...state, index: state.index + 1, answer: null};
    }
  }

  return state;
}

export default function App() {
  const [{questions, index, answer, points, status}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions').then(res => res.json()).then(data => {
      dispatch({type: 'dataReceived', payload: data});
    }).catch(() => {
      dispatch({type: 'dataFailed'});
    });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}