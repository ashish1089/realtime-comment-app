'use client'
import axios from 'axios';
import { io } from 'socket.io-client';
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, List, ListItem, ListItemText, styled, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/router"

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'gray',
    },
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: 'none'
        },
    },
});

export default function Comments() {
    const [comments, setComments] = useState([]);
    // const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const username = localStorage.getItem('username');

    const getdata = async () => {
        const response = await axios.get('http://localhost:8080/api/comments');
        setComments(response.data);
    }

    const socket = useMemo(() => io('http://localhost:8080'), [])
    useEffect(() => {
        getdata();
        socket.on('connect', () => {
            console.log('a user connected')
        })
        socket.on('received-comment', (comment) => {
            setComments(prev => [comment, ...prev.flat()]);
        })
    }, [])

    const postComment = async () => {
        if (comment !== '') {
            const response = await axios.post('http://localhost:8080/api/comments', { username, comment });
            socket.emit('comment', response.data)
            setComment('')
        }
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);

        const formattedDate = date.toLocaleDateString('en-CA');

        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return `${formattedDate} ${formattedTime}`
    }



    return (
        <Box sx={{
            height: "100%",
            width: "70vw",
            display: "flex",
            margin: "0 auto",
            flexDirection: "column",
            justifyContent: "start",
            borderRight: "1px solid gray",
            borderLeft: "1px solid  gray",
            overflow: "hidden",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "1rem"
            }}>
                <h1 style={{ padding: "1rem 1rem" }}>Comments</h1>
                <p style={{ color: 'lightblue' }}>{username}</p>
            </div>
            <Box sx={{
                display: "flex",
                gap: "1rem",
                margin: "1rem",
                justifyContent: "start",
                alignItems: "end",
                border: "1px solid gray",
            }}>
                <CssTextField
                    sx={{
                        width: "100%"
                    }}
                    multiline
                    rows={2}
                    placeholder='what is happening?'
                    onChange={(e) => { setComment(e.target.value) }}
                    value={comment}
                />
                <Button
                    sx={{
                        margin: "0 10px 10px 0"
                    }}
                    variant='contained'
                    onClick={postComment}
                >Post</Button>
            </Box>
            <hr style={{
                borderBottom: "1px solid gray"
            }} />
            <Box
                sx={{
                    overflow: "auto",
                }}>
                <List >
                    {comments.map((c, i) =>
                        <ListItem key={i}
                            sx={{
                                borderBottom: "1px solid gray",
                                margin: "10px 0"
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                width: "100%",
                                alignItems: "start",
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "1rem",
                                }}>
                                    <AccountCircleIcon />
                                    <p>{c.username}</p>
                                </Box>
                                <p>{c.comment}</p>
                                <p style={{ alignSelf: "end", color: "gray" }}>{formatDate(c.timestamp)}</p>
                            </Box>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Box>
    )
}
