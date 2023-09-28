import * as React from 'react';
import { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LinearProgress from '@mui/material/LinearProgress';

import userService from './../../services/user.service'

import "./profile.css"

export default function RecipeReviewCard({ user }) {
   const [userData, setUserData] = useState([]);

   async function fetchData(idUser) {
        try {
            const userInfo = await userService.getUserById(idUser);
            setUserData(userInfo[0][0])
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      useEffect(() => {
        fetchData(user.idUser);
      }, [user.idUser]);


    return (
    <>
        <div className='profileHeader'>
            <div className='profileAvatar'>
                <Avatar sx={{ bgcolor: red[500], width: 150, height: 150 }} aria-label="recipe" src={userData.avatar_url}></Avatar>
            </div>
            <div className='profileData'>
                <div className='profileDataContent'>
                    <h1>{userData.username}</h1>
                    <StarIcon />
                    <p><strong>{userData.experience} EXP</strong></p>
                    <EmojiEventsIcon />
                    <p><strong>{userData.points} PTS</strong></p>
                </div>
                <div>
                    <LinearProgress
                    className="achievementProgression"
                    variant="determinate"
                    color="secondary"
                    value={20}
                    style={{
                        height: '20px',
                    }}
                    />
                </div>
            </div>
        </div>
        <hr />
        
    </>
    );
}