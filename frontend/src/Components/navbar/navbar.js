import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import tokenService from "./../../services/token.service"


export default function Navbar() {

  let navigate = useNavigate();
  
  const signOut = () => {
    navigate('/');
    window.location.reload();
    tokenService.removeToken();
  }

  return (
  <>

    <div className="nav">
      <div className="buttonSignout">
        <Button variant="contained" onClick={(signOut)}>Cerrar Sesión</Button>
      </div>
    </div>

  </>
  );
};
