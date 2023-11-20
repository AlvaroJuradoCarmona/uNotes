import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chart from "chart.js/auto"
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import IconButton from '@mui/material/IconButton';

import EditProfile from './modals/editprofile'

import pdfImage from './../../assets/pdf.png';
import codeImage from './../../assets/code.png';

import userService from './../../services/user.service'
import fileService from './../../services/file.service'
import achievementService from './../../services/achievement.service'

import "./profile.css"

export default function Profile( {user} ) {
   const [userData, setUserData] = useState([]);
   const [files, setFiles] = useState([]);
   const [achievement, setAchievement] = useState([]);
   const [views, setViews] = useState([]);
   const { id } = useParams();
   const canvasRef = useRef(null);

   async function fetchData(id) {
        try {
            const userInfo = await userService.getUserById(id);
            setUserData(userInfo[0][0])
            const fileInfo = await fileService.getFilesByUserId(id);
            setFiles(fileInfo[0])
            const achievementData = await achievementService.getAchievementsByUser(id);
            setAchievement(achievementData[0])
            const viewInfo = await fileService.getViewsByWeekDayByUser(id);
            setViews(viewInfo[0].map(item => item.total_views))
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
    fetchData(id);
    }, [id]);

    function getLevel(experience) {
    const a = 1;
    const b = 1;
    
    const level = Math.floor(a * Math.log(experience/50) + b);
    const percentage = Math.floor((a * Math.log(experience/50) + b) * 100) % 100;

    return {
        level: level,
        percentage: percentage
    };
    }
    
    const expInfo = getLevel(userData.experience);

    const navigate = useNavigate();

    const handleFile = (id) => {
    navigate(`/file/${id}`);
    };

    const handleAllFiles = (id) => {
    navigate(`/profile/file/${id}`);
    };

    const handleAllAchievements = (id) => {
    navigate(`/achievement/${id}`);
    };

    useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [{
          label: '# de Visitas',
          data: views,
          borderColor: 'rgb(75, 192, 192)'
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {if (value % 1 === 0) {return value;}}
            }
          }
        }
      }
    });
    }, [views])

    return (
    <>
        {user.idUser === userData.idUser && <EditProfile user={userData} />}

        <div className='profileHeader'>
            <div className='profileAvatar'>
                <Avatar sx={{ bgcolor: red[500], width: 150, height: 150 }} aria-label="recipe" src={userData.avatar_url}></Avatar>
            </div>
            <div className='profileData'>
                <div className='profileDataContent'>
                    <h1>{userData.username}</h1>
                    <StarIcon />
                    <h3 style={{marginLeft:"5px"}}><strong>{userData.experience} EXP</strong></h3>
                    <EmojiEventsIcon />
                    <h3 style={{marginLeft:"5px"}}><strong>{userData.points} PTS</strong></h3>
                </div>
                <div>
                    <LinearProgress
                    className="achievementProgression"
                    variant="determinate"
                    color="secondary"
                    value={expInfo.percentage}
                    style={{
                        height: '30px',
                    }}
                    />
                    <h3 style={{marginTop:"5px"}}>Nivel {expInfo.level} - {expInfo.percentage} %</h3>
                </div>
            </div>
        </div>
        <hr />
        <div className='profileBody'>
            <div className='profileFiles'>
                <div className='profileFilesHeader'>
                    <h2>Últimos subidos</h2>
                    <Button variant="outlined" style={{ color: 'black', borderColor: 'black' }} onClick={() => handleAllFiles(id)}>VER TODOS</Button>
                </div>
                <table style={{ borderCollapse: 'collapse', width: '100%', height: '700px', alignItems: 'center' }}>
                    <tbody>
                        {files.slice(0, 10).map(({ idDocument, title, idCategory }, id) => (
                        <tr
                            key={id}
                            className="ranking-row"
                            style={{ lineHeight: '1', borderBottom:"1pt solid black" }}
                        >
                            <td className='profileFileIcon' style={{ textAlign: 'left', fontSize: 21, marginLeft: 15, marginTop: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {idCategory >= 6 ? (
                                        <img src={codeImage} alt="Código" style={{ marginRight: '10px' }} />
                                    ) : (
                                        <img src={pdfImage} alt="PDF" style={{ marginRight: '10px' }} />
                                    )}
                                    <p><strong>{title}</strong></p>
                                </div>
                                <IconButton style={{ marginRight: 10 }} onClick={() => handleFile(idDocument)}>
                                    <ArrowCircleUpRoundedIcon />
                                </IconButton>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='profileGraphAndAchievements'>
                <div className='profileChart'>
                    <canvas ref={canvasRef} />
                </div>
                <div className='profileAchievements'>
                    <div className='profileFilesHeader'>
                        <h2>Logros</h2>
                        <Button variant="outlined" style={{ color: 'black', borderColor: 'black' }} onClick={() => handleAllAchievements(id)}>VER TODOS</Button>
                    </div>
                    {achievement.slice(0, 4).map(({ title, description, url_img, idUser }, id) => (
                    <div key={id} className={idUser === null ? 'achievementprofCardWithFilter' : 'achievementprofCard'}>
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
            </div>
        </div>
    </>
    );
}