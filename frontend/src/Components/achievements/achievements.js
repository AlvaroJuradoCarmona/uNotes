import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LinearProgress from '@mui/material/LinearProgress';

import "./achievements.css"

import achievementService from './../../services/achievement.service'

export default function RecipeReviewCard() {
   const [achievement, setAchievement] = useState([]);
   const [count, setUserCount] = useState("");
   const [totalCount, setTotalCount] = useState("");
   const [barValue, setBarValue] = useState(0);
   const { id } = useParams();

   async function fetchData(id) {
        try {
            const achievementData = await achievementService.getAchievementsByUser(id);
            setAchievement(achievementData[0])
            const countData = await achievementService.getAchievementsByUserCount(id);
            setUserCount(countData[0][0].achievementsCount)
            const totalcountData = await achievementService.getAchievementsCount();
            setTotalCount(totalcountData[0][0].totalCount)
            const res = (countData[0][0].achievementsCount / totalcountData[0][0].totalCount) * 100;
            setBarValue(res)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      useEffect(() => {
        fetchData(id);
      }, [id]);

    return (
    <>
        <h1>Logros:</h1>
        <div className="achievementProgressContainer">
        <LinearProgress
        className="achievementProgression"
        variant="determinate"
        color="secondary"
        value={barValue}
        style={{
            height: '20px',
        }}
        />
            <div className="progressTextContainer">
                <p><strong>Total conseguidos: {count} de {totalCount}</strong></p>
            </div>
        </div>
        <hr />
        <div className='achievementContainer'>
            {achievement.map(({ title, description, url_img, idUser }, id) => (
            <div key={id} className={idUser === null ? 'achievementCardWithFilter' : 'achievementCard'}>
                <Card key={id} sx={{ marginBottom: 5}}>
                    <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={url_img}>
                        
                        </Avatar>
                    }
                    title={
                    <strong style={{ fontSize: '1.2rem' }}>{title}</strong>}
                    subheader={description}
                    />
                </Card>
            </div>
            ))}
        </div>
    </>
    );
}