import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import commentService from './../../services/comment.service'

export default function RecipeReviewCard() {
    const { id } = useParams();
    const [comment, setComment] = useState([]);
  
    const fetchData = useCallback(async () => {
      try {
        const commentData = await commentService.getCommentById(id);
        setComment(commentData[0])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, [id]);
    
    useEffect(() => {
      fetchData();
    }, [fetchData]);


    return (
        <div>
            {comment.map(({ username, avatar_url, created_at, description }, id) => (
            <Card key={id} sx={{ marginBottom: 5}}>
                <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    
                    </Avatar>
                }
                title={username}
                subheader={created_at}
                />
                <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                    {description}
                </Typography>
                </CardContent>
            </Card>
            ))}
        </div>
    );
}