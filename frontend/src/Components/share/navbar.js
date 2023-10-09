import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Logo from './../../assets/logo.png'

import userService from '../../services/user.service'
import tokenService from "../../services/token.service"

import "./share.css"


export default function Navbar({ user }) {
  const [users, setUsers] = useState([])
  let navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      if (user)
      {
        const userData = await userService.getUserById(user.idUser);
        setUsers(userData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [user]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const signOut = () => {
    navigate('/');
    window.location.reload();
    tokenService.removeToken();
  }

  return (
  <>
    {users.length !== 0 ? 
    <div className="nav">
      <div className="left">
        <Link href="/subject">
          <img className='logo' src={Logo} width={120} height={80} style={{ paddingBottom: 3.2, paddingTop: 0 }} alt="Logo" />
        </Link>
        
      </div>
      <div className="rightNav">
        <p className='textNav'><strong>{users[0][0].username}</strong></p>
        <Avatar sx={{ bgcolor: red[500], width: 40, height: 40, marginRight: 3 }} aria-label="recipe" src={users[0][0].avatar_url}></Avatar>
        <Link className='buttonSignin' variant="contained" onClick={(signOut)}>Cerrar Sesión</Link>
      </div>
    </div>
    : null} 
  </>
  );
};
