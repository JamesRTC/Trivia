import { useNavigate } from "react-router-dom"
export const StartQuiz = () => {
  
const navigate = useNavigate ()
function startQuiz () {
       navigate("./quizes")
  }

  return (
    <section className="intro-page">
        <h1>Quizical</h1>
        <p>The best Game to sharpen your brain!</p>
        <button onClick = {startQuiz}> Start Quiz</button>
    </section>
  )
}
