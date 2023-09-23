// eslint-disable-next-line react/prop-types
const Options = ({ questions, dispatch, answer }) => {
  const hasAnswered = answer !== null;
  const correct = questions.correctOption === answer;
  console.log(answer);

  return (
    <div className="options flex items-center flex-col gap-5 mb-8 w-full">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? questions.correctOption === index
                ? "correct "
                : "wrong "
              : ""
          } ${
            hasAnswered
              ? questions.correctOption === answer
                ? questions.options[Number(answer)]
                  ? "right"
                  : "wrong"
                : " "
              : ""
          } 
         
          `}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
