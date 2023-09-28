import './App.css';
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';

import Inicio from './Components/inicio/inicio';
import ConfirmAccount from './Components/credentials/confirmAccount'
import SignUp from './Components/credentials/signup';
import Subjects from './Components/subjects/subjects';
import SignIn from './Components/credentials/signin';
import RecoverPassword from './Components/credentials/recoverPassword';
import Navbar from './Components/navbar/navbar';
import SubjectId from './Components/subjects/idsubject'
import File from './Components/files/file'
import Achievements from './Components/achievements/achievements'
import Profile from './Components/profile/profile'

import tokenService from './services/token.service'
import authService from './services/auth.service'


function App() {
  const [user, setUser] = useState(null)

  const location = useLocation()

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
      { location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/recover'
        || location.pathname === '/confirmAccount/:token' || location.pathname === '/' ?
          null : <Navbar user={user} />
      }
      <div className="body">
        <Routes>
          <Route path="/" element={<Inicio />} />
          { user ?
              <>
                  <Route path="subject" element={<Subjects user={user} />} />
                  <Route path="subject/:id" element={<SubjectId user={user} />} />
                  <Route path="file/:id" element={<File user={user} />} />
                  <Route path="achievement" element={<Achievements user={user} />} />
                  <Route path="profile" element={<Profile user={user} />} />
              </> :null
          }
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="recover-password" element={<RecoverPassword />} />
            <Route path="confirmAccount/:token" element={<ConfirmAccount />} />
            <Route path="*" element={<p>Path not resolve</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
