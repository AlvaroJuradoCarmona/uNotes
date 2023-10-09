import * as React from 'react';
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Logo from './../../assets/logo.png'

import authService from '../../services/auth.service'
import tokenService from '../../services/token.service'

import "./credentials.css";

const SignIn = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [checkEmail, setCheckEmail] = React.useState(false)
  const [checkPassword, setCheckPassword] = React.useState(false)

  let nav = useNavigate()

  React.useEffect(() => {
    tokenService.getToken().then(data => {
        if(data && data.length > 0)
          nav("../subject", {replace: true})
    })
  }, [nav])

  const handleEmail = (event) => {
    if (event.target.value.length > 0)
      setCheckEmail(false)
    else
      setCheckEmail(true)
    setEmail(event.target.value)
  };

  const handlePassword = (event) => {
    if (event.target.value.length > 7)
      setCheckPassword(false)
    else
      setCheckPassword(true)
    setPassword(event.target.value)
  };

  const generateToken = (e) => {
    e.preventDefault()
    authService.signIn({
      email, password
    }).then(t=>{
      console.log(t)
      setTimeout(() => {
        tokenService.setToken(t.token)
        window.location.reload(true)
      }, 5000)
    }).catch(e=>{
      console.log(e);
    })
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
  <div className="signContainer">
    <div className="signBox">
      <Link href="/">
          <img className='logo' src={Logo} width={120} height={80} style={{ paddingBottom: 3.2, paddingTop: 0 }} alt="Logo" />
      </Link>
      <h1>Iniciar sesión</h1>
      <div className="signFields">
        <div className="signTextField">
          <TextField fullWidth error={checkEmail} label="Correo electrónico" onChange={handleEmail}/>
          {checkEmail ? <p className='errorAlert'>No debe estar vacío</p>: null}
        </div>

        <div className="signTextField">
          <FormControl sx={{ width: '100%' }} variant="outlined" className="signTextField">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                error={checkPassword}
                onChange={handlePassword}
              />
              {checkPassword ? <p className='errorAlert'>Debe al menos 8 carácteres</p>: null}
            </FormControl>
          </div>

          <Button variant="contained" id="signButton" onClick={generateToken}>Iniciar Sesión</Button>
      </div>
      <div>
          <p>Do you have an account?</p>
      </div>
    </div>
  </div>
  );
}

export default SignIn