import { Typography, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { socket } from '../../socket';
import ChatContext from "../Store/ChatContext";
import axios from "axios";

interface Message {
    logged_in_user_uuid: string;
    sortedusersids: string;
    message: string;
}

const Chats = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const { selectedUser, isMessage } = useContext(ChatContext) as {
        selectedUser: { user_uuid: string } | null;
        isMessage: boolean;
    };

    const logged_in_user = localStorage.getItem("user_uuid");

    // Ensure `logged_in_user` and `selectedUser?.user_uuid` are valid strings
    const sortUsersToShow = logged_in_user && selectedUser?.user_uuid
        ? [logged_in_user, selectedUser.user_uuid].sort().join("_")
        : "";

    useEffect(() => {
        const getUsersMessages = async () => {
            if (!sortUsersToShow) return; // Skip if `sortUsersToShow` is invalid
            try {
                const getMessages = await axios.post<{ data: Message[] }>(
                    `${import.meta.env.VITE_BaseURL}getMessages`,
                    { sorteduseruuids: sortUsersToShow }
                );
                setMessages(getMessages.data.data);
            } catch (error) {
                console.error("Error while fetching messages:", error);
            }
        };
        getUsersMessages();
    }, [isMessage, sortUsersToShow]);

    useEffect(() => {
        const handleReceiveMessage = (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on('receiveMessage', handleReceiveMessage);

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, []);

    return (
        <Box
            sx={{
                overflowY: "auto",
            }}
            className="overflow-x-auto"
        >
            {messages?.map((msg, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        height: '40px',
                        justifyContent: msg.logged_in_user_uuid === logged_in_user ? 'flex-end' : 'flex-start',
                    }}
                >
                    {sortUsersToShow === msg.sortedusersids && (
                        <Typography
                            variant="h6"
                            style={{
                                background: msg.logged_in_user_uuid === logged_in_user ? "#AFE1AF" : "lightgray",
                            }}
                            sx={{
                                borderRadius: '4px',
                                padding: '4px',
                                margin: '2px',
                                height: 'auto',
                            }}
                        >
                            {msg.message}
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default Chats;