import express from 'express';
import { chats } from './data/data.js';
import dotenv from 'dotenv/config';
import { connectDB } from './config/db.js';

connectDB();
const app = express();

// routes api
app.get("/", (req, res) => {
    res.send("Api is running");
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    const { id } = req.params;
    const singleChat = chats.find(c => c._id === id);
    res.send(singleChat);
});

// routes ends
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running at port ${PORT}`));