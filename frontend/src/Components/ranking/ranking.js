import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import rankingService from "../../services/ranking.service"

import "./ranking.css"

export default function BasicTable({ user }) {
  const [usersExp, setUsersExp] = useState([])
  const [usersPts, setUsersPts] = useState([])
  const [expSum, setExpSum] = useState("")
  const [ptsSum, setPtsSum] = useState("")
  const [expPos, setExpPos] = useState("")
  const [ptsPos, setPtsPos] = useState("")
  const [daysLeft, setDaysLeft] = useState("")
  
  const fetchData = useCallback(async () => {
    try {
      const userExpData = await rankingService.getExperienceRanking(user.idUser);
      setUsersExp(userExpData.users[0]);
      setExpPos(userExpData.userPosition)
      const userPtsData = await rankingService.getPointsRanking(user.idUser); 
      setUsersPts(userPtsData.users[0]);
      setPtsPos(userPtsData.userPosition)
      const ExpSumData = await rankingService.getExperienceSum();
      setExpSum(ExpSumData[0][0].totalExperience);
      const PtsSumData = await rankingService.getPointsSum();
      setPtsSum(PtsSumData.user[0][0].totalPoints);
      setDaysLeft(PtsSumData.timeLeft[0][0].days_remaining)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [user.idUser]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <> 
      <div className='daysLeft'>
        <AccessAlarmIcon style={{ fontSize: 35, marginRight: 6 }}/>
        <h1>TERMINA EN {daysLeft} DÍAS</h1>
      </div>

      <div className="halftable">
        <div className='rankingExpTitle'>
          <div className="rankingSum">
            <StarIcon />
            <p style={{ marginLeft: 5, fontSize: 20 }}><strong>{expSum}</strong></p>
          </div>
          <div>
            <h2>RANKING EXPERIENCIA</h2>
          </div>
          <div>
            <p><strong>Mi puesto:</strong></p>
            <p style={{ fontSize: 30 }}><strong>#{expPos}</strong></p>
          </div>
        </div>
        
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {usersExp.map(({ idUser, username, avatar_url, experience }, id) => (
              <tr
                key={id}
                className="ranking-row"
                onClick={() => handleRowClick(idUser)}
                style={{ lineHeight: '3' }}
              >
                <td style={{ textAlign: 'right', width: 60 }}>
                  <Avatar sx={{ bgcolor: red[500], width: 45, height: 45 }} aria-label="recipe" src={avatar_url}></Avatar>
                </td>
                <td style={{ textAlign: 'left', fontSize: 21 }}><strong>{username}</strong></td>
                <td style={{ fontSize: 21 }}><strong>{experience}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="halftable">
        <div className='rankingPtsTitle'>
          <div className="rankingSum">
          <EmojiEventsIcon />
            <p style={{ marginLeft: 5, fontSize: 20 }}><strong>{ptsSum}</strong></p>
          </div>
          <div>
            <h2>RANKING PUNTOS</h2>
          </div>
          <div>
            <p><strong>Mi puesto:</strong></p>
            <p style={{ fontSize: 30 }}><strong>#{ptsPos}</strong></p>
          </div>
        </div>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {usersPts.map(({ idUser, username, avatar_url, points }, id) => (
              <tr
                key={id}
                className="ranking-row"
                onClick={() => handleRowClick(idUser)}
                style={{ lineHeight: '3' }}
              >
                <td style={{ textAlign: 'right', width: 60 }}>
                  <Avatar sx={{ bgcolor: red[500], width: 45, height: 45 }} aria-label="recipe" src={avatar_url}></Avatar>
                </td>
                <td style={{ textAlign: 'left', fontSize: 21 }}><strong>{username}</strong></td>
                <td style={{ fontSize: 21 }}><strong>{points}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}