import Options from "./Options";

const Questions = ({ questions, dispatch, answer, index }) => {
  // console.log(questions);
  return (
    <div>
      <h4>{`Q${index + 1}. ${questions.question}`}</h4>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Questions;
