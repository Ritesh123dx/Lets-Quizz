import React, {useState} from "react";

const QuestionBox = ({question, options, selected, questionNumber}) => {
  const [answer, setAnswer] = useState(options)
  return (
      <>
      <div className="question text-center mt-4"><h3>{questionNumber}. {question}</h3></div>
      <div className="text-center mt-5">
      {answer.map((text,index) => (
        
        <button key={index} className="btn btn-lg btn-success mx-3 my-2" onClick={()=>{
          setAnswer([text]);
           selected(text);}}>
          {text}
        </button>
      )
      )}
      </div>
      
      
    </>
  );
};

export default QuestionBox;
