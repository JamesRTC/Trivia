import { useState, useEffect } from "react";

export const Questions = (props) => {
  const [allAnswers, setAllAnswers] = useState([]);
  const [highlightSelectedAnswer, setHighlightSelectedAnswer] = useState(null);

  function isCorrect(answer) {
    return answer === props.correctAnswer;
  }

  useEffect(() => {
    // Combine correct and wrong answers into a new array
    let answersArray = [props.correctAnswer, ...props.wrongAnswers];

    // Shuffle the combined answers array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Set the shuffled array as the state
    setAllAnswers(shuffleArray(answersArray));
  }, [props.correctAnswer, props.wrongAnswers]);

  function handleSelectedAnswer(event, answer, id) {
    // props.setUncheckAnswers(false);
    setHighlightSelectedAnswer(null);
   
    if (answer === props.selectedAnswers.find((item) => item.id === id)?.answer) {
      // Clear the answer if it's already selected
      trackAnswers(null, id);
      setHighlightSelectedAnswer(null);
     
    } else {
      trackAnswers(answer, id);
      setHighlightSelectedAnswer(answer);
    }
  
  }

  function trackAnswers(answer, id) {
    props.setSelectedAnswers((prevState) => {
      const foundIndex = prevState.findIndex((currentItem) => id === currentItem.id);
  
      if (foundIndex !== -1) {
        // Update the existing answer with the new one
        const updatedAnswers = [...prevState];
        updatedAnswers[foundIndex] = { id, answer };
        return updatedAnswers;
      } else {
        // Add a new answer if it doesn't exist
        
        return [...prevState, { id, answer }];
      }
    });
  }


  return (
    <div className="questions">
      <p>{props.question}</p>
      <div>
        { 
        
        allAnswers.map((answer, index) => (
          <span
            className={`${
              highlightSelectedAnswer === answer ? "selected" : ""
            } ${
              props.handleCheckAnswer && isCorrect(answer)
                ? "is-correct"
                :props.handleCheckAnswer && !isCorrect(answer)
                ? "is-wrong"
                : ""
            } }`}
            onClick={(event) => handleSelectedAnswer(event, answer, props.id)}
            key={index}
          >
            {answer}
          </span>
        ))
        }
      </div>
    </div>
  );
};

