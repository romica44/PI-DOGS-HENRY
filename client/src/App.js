import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import  Detail from "./components/Detail";
import DogCreate from "./components/DogCreate"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Routes>
       <Route path = "/" exact element = {<LandingPage/>}/>
       <Route path = "/home" element = {<Home/>}/>
       <Route path = "/dogs" element = {<DogCreate/>}/>
       <Route path = "/home/:id" element = {<Detail/>}/>
     </Routes>
     </BrowserRouter>
     </div>  
    
  );
}

export default App;
