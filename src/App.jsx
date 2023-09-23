import "./App.css";
import Header from "../src/Component/Header";
import Main from "./Component/Main";
import { useEffect, useReducer } from "react";
import Loading from "../src/Component/Loader";
import Error from "../src/Component/Error";
import StartScreen from "./Component/StartScreen";
import Questions from "./Component/Questions";
import NextButton from "./Component/NextButton";
import Progress from "./Component/Progress";
import FinishedScreen from "./Component/FinishedScreen";
import Footer from "./Component/Footer";
import Timer from "./Component/Timer";

import { data } from "../src/data/PalakMaths";
const SEC_PER_QUESTIONS = 60;
const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemining: state.questions.length * SEC_PER_QUESTIONS,
      };
    case "newAnswer":
      //eslint-disable-next-line
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        secondsRemining: state.secondsRemining - 1,
        status: state.secondsRemining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unKnown");
  }
};

function App() {
  const [
    { status, questions, answer, index, points, highscore, secondsRemining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  // const maxoints = questions.reduce((prev, curr) => {
  //   prev + curr.points;
  // });
  const maxPoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

  useEffect(() => {
    // fetch("http://localhost:9000/questions")
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //   .catch((err) => dispatch({ type: "dataFailed" }));
    dispatch({ type: "dataReceived", payload: data });
  }, []);

  return (
    <div className="app grid h-screen grid-rows-[auto-1fr]">
      {status === "active" && <Header />}
      <div className="m-4">
        <Main>
          {status === "Loading" && <Loading />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPoints={maxPoints}
                answer={answer}
              />
              <Questions
                questions={questions[index]}
                dispatch={dispatch}
                answer={answer}
                index={index}
              />
              <Footer>
                <Timer dispatch={dispatch} secondsRemining={secondsRemining} />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishedScreen
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </div>
  );
}

export default App;
