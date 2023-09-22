import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import Logo from './../../assets/logo.png'

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
      <div className="left">
        <Link href="/">
          <img className='logo' src={Logo} width={120} height={80} style={{ paddingBottom: 3.2, paddingTop: 0 }} alt="Logo" />
        </Link>
      </div>
      <div className="right">
        <Link className='buttonSignin' variant="contained" onClick={(signOut)}>Cerrar Sesión</Link>
      </div>
    </div>
  </>
  );
};
