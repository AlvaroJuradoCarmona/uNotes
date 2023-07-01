import './App.css';
import { Routes, Route } from "react-router-dom"
import Inicio from './Components/inicio/inicio';
import SignUp from './Components/credentials/signup';
import Subjects from './Components/subjects/subjects';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
