import { useEffect } from "react";
/* eslint-disable-next-line */
const Timer = ({ dispatch, secondsRemining }) => {
  const min = Math.floor(secondsRemining / 60);
  const sec = secondsRemining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 ? 0 : ""}
      {min}:{sec < 10 ? 0 : ""}
      {sec}
    </div>
  );
};

export default Timer;
