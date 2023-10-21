import { useState, useEffect } from 'react';
import { Questions } from '../component/Questions';
import { Alert } from '../component/Alert';
// import data from '../Data/data';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export const ScienceNature = () => {
    const [question, setQuestion] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Initialize as an empty array
    const [handleCheckAnswer, setHandleCheckAnswer] = useState (false)
    const [correctAnswers, setCorrectAnswers] = useState ([]); 
    const [countCorrectAnswers, setCountCorrectAnswers] = useState(0)
    const [alertComponent, setAlertComponent] = useState (false)
    const [alertMessage, setAlertMessage] = useState ("")
    const [gameOver, setGameOver] = useState (false)
    const [selectedQuestions, setSelectedQuestions] = useState ([]); 
    const [rawData, setRawData] = useState ([])
   
    useEffect(() => {
      fetch('https://opentdb.com/api.php?amount=50&category=17&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        setRawData(data.results);
  
        // Generate random question indices
        const randomNums = [];
        for (let i = 0; i < 5; i++) {
          randomNums.push(Math.floor(Math.random() * data.results.length));
        }
  
        // Select random questions and store them in selectedQuestions
        const selectedQuestions = randomNums.map((index) => data.results[index]);
        setCorrectAnswers (selectedQuestions.map ((trivia) => trivia.correct_answer))
        setSelectedQuestions(selectedQuestions.map((trivia) => ({
          quiz: trivia.question,
          correctAnswer: trivia.correct_answer,
          wrongAnswers: trivia.incorrect_answers,
          id: nanoid(),
          isSelected: false,
        })));
        
      })}, [])
  
  
    // useEffect(() => { 
    //   // Fetch data and set questions and correct answers
    //   setQuestion(
    //     data.results.map((trivia) => ({
    //       quiz: trivia.question,
    //       correctAnswer: trivia.correct_answer,
    //       wrongAnswers: trivia.incorrect_answers,
    //       id: nanoid(),
    //       isSelected: false,
    //     }))
    //   );
  
    //   setCorrectAnswers (data.results.map ((trivia) => trivia.correct_answer))
    // }, []);
  
    function checkAnswer () {
      setHandleCheckAnswer(true)
      correctAnswersCount()
      setGameOver(true)
    }
  
  
   
    const questions = selectedQuestions.map((trivia) => (
      <Questions
        id = {trivia.id}
        key= {trivia.id}
        question={trivia.quiz}
        correctAnswer={trivia.correctAnswer}
        wrongAnswers={trivia.wrongAnswers}
        selectedAnswers={selectedAnswers} // Pass the selected answers
        setSelectedAnswers = {setSelectedAnswers}
        handleCheckAnswer = {handleCheckAnswer}
        setCountCorrectAnswers = {setCountCorrectAnswers}
        
        
      />
    ));
  
      function displayAlert (message) {
        setAlertComponent(true) 
        setAlertMessage(message)
      }
  
      function correctAnswersCount () {
        selectedAnswers.map(selectedAnswer => {
          if(correctAnswers.includes(selectedAnswer.answer)) {
            setCountCorrectAnswers(prev => prev + 1) 
          }
        })
      }
  
      function resetGame() {
        setHandleCheckAnswer(false);
        setSelectedAnswers([]);
        setCountCorrectAnswers(0);
        setAlertComponent(false);
        setGameOver(false);
       
        // Fetch new questions and set the game state
        fetchNewQuestions();
      }
      
      // Function to fetch new questions
      async function fetchNewQuestions() {
        try {
          const res = await fetch('https://opentdb.com/api.php?amount=50&category=17&difficulty=easy&type=multiple');
          const data = await res.json();
      
          // Select a new set of random questions from the fetched data
          const newRandomQuestions = [];
          for (let i = 0; i < 5; i++) {
            newRandomQuestions.push(data.results[Math.floor(Math.random() * data.results.length)]);
          }
      
          // Update the game state with new questions and answers
          setSelectedQuestions(newRandomQuestions.map((trivia) => ({
            quiz: trivia.question,
            correctAnswer: trivia.correct_answer,
            wrongAnswers: trivia.incorrect_answers,
            id: nanoid(),
            isSelected: false,
          })));
      
          setCorrectAnswers(newRandomQuestions.map((trivia) => trivia.correct_answer));
        } catch (error) {
          console.error('Error fetching new questions:', error);
          // Handle the error appropriately
        }
      }
  
      console.log(rawData);
  
    return (
      <section className="quizes">
        {alertComponent && <Alert alertMessage = {alertMessage} close = {()=> setAlertComponent(false)}/>}
        {handleCheckAnswer && countCorrectAnswers === correctAnswers.length ? <Confetti 
        width={1480} // Set the width in pixels
        height={1280} // Set the height in pixels
        numberOfPieces={1000} /> : ""}
         <h3 className = "topic-heading">Science and Nature</h3>
        {questions}
        <div className="div-button">
        {handleCheckAnswer ? <p className='score'>Your score is {countCorrectAnswers}/{correctAnswers.length}</p> : ""} { gameOver ? <button onClick={resetGame}> Play Again </button> : <button onClick={selectedAnswers.length === correctAnswers.length? checkAnswer : ()=> displayAlert("Please answer all questions before checking the answers.")}> Check Answers </button>}
        </div>
      </section>
    );
  };
  
  