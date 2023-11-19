import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Logo from './../../assets/logo.png'

import authService from '../../services/auth.service'

import "./credentials.css";

const RecoverPassword = () => {

  const [email, setEmail] = React.useState("");
  const [checkEmail, setCheckEmail] = React.useState(false)

  const handleEmail = (event) => {
    if (event.target.value.length > 0)
      setCheckEmail(false)
    else
      setCheckEmail(true)
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
      <Link href="/">
          <img className='logo' src={Logo} width={120} height={80} style={{ paddingBottom: 3.2, paddingTop: 0 }} alt="Logo" />
      </Link>
      <h1>Recuperar contraseña</h1>
      <div className="signFields">
        <div className="signTextField">
          <TextField fullWidth error={checkEmail} label="Correo electrónico" onChange={handleEmail}/>
          {checkEmail ? <p className='errorAlert'>No debe estar vacío</p>: null}
        </div>

        <Button variant="contained" id="signButton" onClick={changePassword}>Iniciar Sesión</Button>
      </div>
      <div style= {{ display: 'flex', justifyContent: 'center', marginTop: 15, marginBottom: 25 }}>
        <Link href="/signin">Volver a iniciar sesión</Link>
      </div>
    </div>
  </div>
  );
}

export default RecoverPassword