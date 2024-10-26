
import { Typography, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { socket } from '../../socket.ts';
import ChatContext from "../Store/ChatContext.tsx";
import axios from "axios";

const Chats = () => {
    const [messages, setMessages] = useState([]);
console.log(messages);

    const { user, selectedUser, isMessage } = useContext(ChatContext);
    console.log(selectedUser);
    

    const logged_in_user = localStorage.getItem("user_uuid");

    const sortUsersToShow = [logged_in_user, selectedUser?.user_uuid].sort().join("_");
    console.log(sortUsersToShow ,"VALUE");


    useEffect(() => {
        const getUsersMessages = async () => {
            try {
                const getMessages = await axios.post('http://localhost:3000/getMessages', { sorteduseruuids:sortUsersToShow});
                console.log(getMessages.data.data);
                setMessages(getMessages.data.data);
            } catch (error) {
                console.error(error, "Error while fetching");
            }
        }
        getUsersMessages();
    }, [isMessage])


    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            console.log(data, "getting in ");

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
        <div >
            {messages?.map((msg, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex', height:'40px',
                        justifyContent: msg.logged_in_user_uuid === logged_in_user ? 'flex-end' : 'flex-start',
                    }}
                >
                    {sortUsersToShow === msg.sortedusersids ?
                        <Typography
                            variant="h6"
                            style={{background:msg.logged_in_user_uuid === logged_in_user ? "#AFE1AF" : "lightgray"}}
                            sx={{
                                borderRadius: '4px',
                                padding:'4px',
                                margin: '2px',
                                height:'auto'
                            }}
                        >
                            {msg.message}
                        </Typography>
                        : null}
                </Box>
            ))}
        </div>
    );
};

export default Chats;
