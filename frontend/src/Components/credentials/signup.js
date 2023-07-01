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
import UniversitySelector from '../selectors/universitySelector'

import "./credentials.css";

export default function SignUp() {
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
          <TextField fullWidth label="Usuario" />
        </div>
        <div className="signTextField">
          <TextField fullWidth label="Correo electrónico" />
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
              />
            </FormControl>
          </div>
          <div className="signTextField">
            <UniversitySelector />
          </div>
          <Button variant="contained" id="signButton">Crear Cuenta</Button>
      </div>
      <div>
          <p>Do you have an account?</p>
      </div>
    </div>
  </div>
  );
}
