// eslint-disable-next-line react/prop-types
const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
  return (
    <header className="progress mb-2 ">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} Points
      </p>
    </header>
  );
};

export default Progress;
