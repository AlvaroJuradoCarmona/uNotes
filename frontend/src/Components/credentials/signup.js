import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import authService from '../../services/auth.service'
import tokenService from '../../services/token.service'

import facultyServices from '../../services/faculty.service';
import UniversitySelect from '../selectors/universitySelector';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import "./credentials.css";

const SignUp = () => {

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const [faculties, setFaculties] = React.useState([]);
  const [selectedFaculty, setSelectedFaculty] = React.useState('');
  const [selectedUniversity, setSelectedUniversity] = React.useState('');

  React.useEffect(() => { 
    facultyServices.getFacultiesByUniversity(selectedUniversity).then(p => {
      setFaculties(p);
    })
  }, [selectedUniversity]);

  const handleUsername = (event) => {
    setUsername(event.target.value)
  };

  const handleEmail = (event) => {
    setEmail(event.target.value)
  };

  const handlePassword = (event) => {
    setPassword(event.target.value)
  };

  const handlePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value)
  };

  const handleFaculty = (event) => {
    setSelectedFaculty(event.target.value)
  };

  const generateToken = (e) => {
    e.preventDefault()

    authService.signUp({
      username, email, password, passwordConfirmation, selectedUniversity, selectedFaculty
    }).then(t=>{
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
      <h1>Sign up</h1>
      <div className="signFields">
        <div className="signTextField">
          <TextField fullWidth label="Usuario" onChange={handleUsername}/>
        </div>
        <div className="signTextField">
          <TextField fullWidth label="Correo electrónico" onChange={handleEmail}/>
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
                onChange={handlePassword}
              />
            </FormControl>
          </div>

          <div className="signTextField">
            <FormControl sx={{ width: '100%' }} variant="outlined" className="signTextField">
              <InputLabel htmlFor="outlined-adornment-password">Confirmación</InputLabel>
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
                label="Confirmación"
                onChange={handlePasswordConfirmation}
              />
            </FormControl>
          </div>
          <div className="signTextField">
            <UniversitySelect setSelectedUniversity={setSelectedUniversity} />
            <div className="selectorBox">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedFaculty}
                  label="Facultad"
                  onChange={handleFaculty}
                >
                  {faculties.length > 0 &&
                    faculties[0].map(({ idFaculty, name }) => (
                      <MenuItem key={idFaculty} value={idFaculty}>{name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <Button variant="contained" id="signButton" onClick={generateToken}>Crear Cuenta</Button>
      </div>
      <div>
          <p>Do you have an account?</p>
      </div>
    </div>
  </div>
  );
}

export default SignUp