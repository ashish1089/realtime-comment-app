'use client'
import styled from '@emotion/styled';
import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"

const CssTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            border: 'none'
        },
    },
});

export default function Login() {
    const [username, setUsername] = useState('');
    const router = useRouter();

    const hanldeSubmit = async (e) => {
        const response = await axios.post("http://localhost:8080/api/login", { username },
            { withCredentials: true })
        console.log(response.data);
        router.push(`/comments`);
        localStorage.setItem('username', username);
    }


    return (
        <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: 'start',
            background: "#000",
        }}>
            <Paper
                sx={{
                    marginTop: "10rem",
                    height: 'fit-content',
                    width: "max-content",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',
                    gap: '2rem',
                    background: "#000",
                    border: "1px solid gray",
                }} elevation={10}>
                <h1 style={{ color: "#fff" }}>Comments App</h1>
                <CssTextField
                    required
                    sx={{ border: "1px solid gray", }}
                    onChange={(e) => { setUsername(e.target.value) }}
                    value={username}
                    placeholder="Username" />
                <Button variant="contained" size='large' disableRipple disableFocusRipple onClick={hanldeSubmit}>
                    Login
                </Button>
            </Paper>
        </div>

    )
}
