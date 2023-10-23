import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Pagination from '@mui/material/Pagination';

import DeleteComment from './modals/deletecomment'

import commentService from './../../services/comment.service';

export default function RecipeReviewCard({user}) {
    const { id } = useParams();
    const [comment, setComment] = useState([]);
    const [page, setPage] = useState(1);
    const commentsPerPage = 4;

    const fetchData = useCallback(async () => {
        try {
            const commentData = await commentService.getCommentById(id);
            setComment(commentData[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const displayedComments = comment.slice(startIndex, endIndex);

    return (
        <div>
            {displayedComments.map(({ idComment, idUser, username, avatar_url, created_at, description }, index) => (
                <Card key={index} sx={{ marginBottom: 5 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500], width: 35, height: 35 }} aria-label="recipe" src={avatar_url}></Avatar>
                        }
                        title=<strong>{username}</strong>
                        subheader={created_at}
                        action={
                            (user.idUser === idUser || user.isAdmin === 1) && <DeleteComment idComment={idComment} />
                        }
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {comment.length > commentsPerPage && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={Math.ceil(comment.length / commentsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="secondary"
                    size="large"
                />
              </div>
            )}
        </div>
    );
}
