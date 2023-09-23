// eslint-disable-next-line react/prop-types
const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-[3.5rem] text-center text-gray-400">
        Welcome to The React Quiz!
      </h2>
      <h3 className="text-[2rem] text-center text-cyan-300">
        {numQuestions} questions to track your Progress.
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        {"Let's start"}
      </button>
    </div>
  );
};

export default StartScreen;
