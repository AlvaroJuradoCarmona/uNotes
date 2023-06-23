import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Inicio from './Components/inicio/inicio';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio/>} />
      </Routes>
    </div>
  );
}

export default App;
