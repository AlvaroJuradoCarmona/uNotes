import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import authService from '../../services/auth.service'

import "./credentials.css";

const RecoverPassword = () => {

  const [email, setEmail] = React.useState("");


  const handleEmail = (event) => {
    setEmail(event.target.value)
  };

  const changePassword = (e) => {
    e.preventDefault()
    authService.recoverPassword({
      email
    }).then(t=>{
      console.log(t)
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
  <div className="signContainer">
    <div className="signBox">
      <h1>Recover password</h1>
      <div className="signFields">
        <div className="signTextField">
          <TextField fullWidth label="Correo electrónico" onChange={handleEmail}/>
        </div>

        <Button variant="contained" id="signButton" onClick={changePassword}>Iniciar Sesión</Button>
      </div>
      <div>
        <Link href="/signin">Volver a iniciar sesión</Link>
      </div>
    </div>
  </div>
  );
}

export default RecoverPassword