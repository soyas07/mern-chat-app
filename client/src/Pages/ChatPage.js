import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios('/api/chat');
        setChats(data);
    }

    useEffect(() => {
        fetchChats();
    }, [])
    

    return (
        <div>
            {chats.map(c => <p key={c._id}>{c.chatName}</p>)}
        </div>
    )
}

export default ChatPage