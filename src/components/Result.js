import React from "react";

const Result = ({score, playAgain, numberOfQuestions}) => (
  <div>
    <h3>You scored {score} / {numberOfQuestions} correct answers!</h3>
    <button className="btn btn-lg btn-primary" onClick={playAgain}>
      Play again!
    </button>
  </div>
);

export default Result;
