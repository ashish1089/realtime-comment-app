import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getAllComments, getComment, createComment, } from './database.js';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser())

io.on('connection', (socket) => {
    socket.on('comment', (comment) => {
        console.log('send comment'); comment
        io.emit('received-comment', comment);
    })
});

//login and return a session id.
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    const sessionId = uuidv4();
    res.cookie('sessionId', sessionId, { secure: true, httpOnly: true, sameSite: 'none' });
    res.send('user data added to cookie');
})

// get all comments 
app.get('/api/comments', async (req, res) => {
    const allComments = await getAllComments();
    res.json(allComments);
})

//  store comment and with its username in mysql
app.post('/api/comments', async (req, res) => {
    const { username, comment } = req.body;
    const data = await createComment(username, comment);
    res.status(201).json(data);
})


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
