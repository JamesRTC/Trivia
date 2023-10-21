import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import { Quizes, StartQuiz } from './Pages/Index';
import { History } from './Pages/History';
import { Geography } from './Pages/Geography';
import { Film } from './Pages/Film';
import { VideoGames } from './Pages/VideoGames';
import { ScienceNature } from './Pages/ScienceNature';
import { Footer } from './component/Footer';
import './App.css';

function App() {

  const styles = {
    backgroundColor : "black", 
    fontWright: "bold",
    color: "white"
  }
  return (
    <div className="App">
      <h1 className='app-heading'>Quizical Trivia</h1>
      <h3 className='topics' style = {{textAlign: "center", paddingBottom: "10px" }}> Select a topic using these buttons </h3>
   
    <nav className = "topics-buttons">
        <NavLink className= "topic" style = {({isActive}) => isActive ? styles : null} to = "history">History</NavLink>
        <NavLink className= "topic" style = {({isActive}) => isActive ? styles : null} to = "geography">Geography</NavLink>
        <NavLink className= "topic" style = {({isActive}) => isActive ? styles : null} to = "film">Film</NavLink>
        <NavLink className= "topic" style = {({isActive}) => isActive ? styles : null} to = "videoGames">Video Games</NavLink>
        <NavLink className= "topic" style = {({isActive}) => isActive ? styles : null} to = "scienceNature">Science & Nature</NavLink>
        <NavLink className= "topic" style = {({isActive}) => isActive ? styles : null} to = "quizes">General Questions</NavLink>
      </nav>
      {/* <StartQuiz/> */}
      <Routes>
        <Route path = "quizes" element = { <Quizes/>}>  </Route>
        <Route path = "history" element = { <History/>}>  </Route>
        <Route path = "geography" element = { <Geography/>}>  </Route>
        <Route path = "film" element = { <Film/>}>  </Route>
        <Route path = "videoGames" element = { <VideoGames/>}>  </Route>
        <Route path = "scienceNature" element = { <ScienceNature/>}>  </Route>
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
