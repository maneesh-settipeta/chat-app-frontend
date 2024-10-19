
import { Typography, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { socket } from '../../socket.ts';
import ChatContext from "../Store/ChatContext.tsx";

const Chats = () => {
    const [messages, setMessages] = useState([]);

    const { user, selectedUser } = useContext(ChatContext);

    console.log(messages);
    console.log(selectedUser);
    

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            console.log("Recieing mess");
            
            setMessages((prevMessages) => [
                ...prevMessages,
                data,
            ]);
        });
        return () => {
            socket.off('receiveMessage');
        };

    }, [socket]);

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
                    {/* {msg.logged_in_user_uuid === selectedUser.user_uuid ?  */}
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
                     {/* : null} */}
                </Box>
            ))}
        </div>
    );
};

export default Chats;
