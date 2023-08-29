import './App.css';
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react';

import Inicio from './Components/inicio/inicio';
import ConfirmAccount from './Components/credentials/confirmAccount'
import SignUp from './Components/credentials/signup';
import Subjects from './Components/subjects/subjects';
import SignIn from './Components/credentials/signin';

import tokenService from './services/token.service'
import authService from './services/auth.service'


function App() {
  const [user, setUser] = useState(null)
  //console.log(tokenService.getToken())
  useEffect(() => {
    tokenService.getToken().then(data => {
      if (data) {
        authService.getAccount(data).then(elem => {
          setUser(elem)
        }).catch(() => {
            tokenService.removeToken()
        })
      }
    })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/confirmAccount/:token" element={<ConfirmAccount/>} />
        { user ?
            <>
              <Route path="/" element={<Subjects/>} />
            </> : null
          }
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
      </Routes>
    </div>
  );
}

export default App;
