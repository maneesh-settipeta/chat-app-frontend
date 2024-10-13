
import { Typography, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { socket } from '../../socket.ts';
import ChatContext from "../Store/ChatContext.tsx";

const Chats = () => {
    const [messages, setMessages] = useState([]);
    const {user} = useContext(ChatContext)

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                         data,
            ]);
        });
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    return (
        <div>
            {messages?.map((msg, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        justifyContent: msg.logged_in_user_uuid === user.user_uuid ? 'flex-end' : 'flex-start',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            background: "lightgray",
                            borderRadius: '4px',
                            padding: '6px',
                            margin: '2px',
                            maxWidth: '60%',
                        }}
                    >
                        {msg.message}
                    </Typography>
                </Box>
            ))}
        </div>
    );
};

export default Chats;
