import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [time, setTime] = useState(props.time || 5);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      }
      if (time === 0) {
        props.function();
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);
  return (
    <div className="timer">
      <p className="timer__text">{time}</p>
    </div>
  );
};

export default Timer;
