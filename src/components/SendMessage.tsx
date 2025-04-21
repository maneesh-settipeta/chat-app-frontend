import Box from '@mui/material/Box';
import { AppBar, IconButton, TextField, Toolbar } from "@mui/material";
import Chats from './Chats';
import { socket } from "../../socket";
import UserChats from "./UserChats";
import ChatContext from "../Store/ChatContext";
import { useContext, useState, useEffect, useRef } from "react";
import profilepic from '../Images/profile-picture-5.jpg';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material';

interface SelectedUser {
    user_uuid: string;
    first_name: string;
    last_name: string;
    email: string;
}

const SendMessage = () => {
    const { selectedUser } = useContext(ChatContext) as { selectedUser: SelectedUser | null };
    const [message, setMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const theme = createTheme({
        palette: {
            background: {
                default: '#EFEAE2', // WhatsApp background color
            },
            primary: {
                main: '#128c7e', // WhatsApp's signature green
            },
            secondary: {
                main: '#25d366', // WhatsApp's green accent (e.g., send button)
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            body2: {
                fontSize: '14px', // Message text size
            },
            caption: {
                fontSize: '11px', // Timestamp size
                color: '#999999', // Light gray for timestamps
            },
        },
    });

    const handleSendMessage = () => {
        const loggedInUserUuid = localStorage.getItem('user_uuid');
        if (loggedInUserUuid && selectedUser?.user_uuid && message.trim()) {
            socket.emit('sendMessage', {
                logged_in_user_uuid: loggedInUserUuid,
                receiver_uuid: selectedUser.user_uuid,
                message: message,
            });
            setMessage("");
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ borderRight: '2px solid #ccc', overflowY: 'auto', height: '90vh', width: '25%' }}>
                <UserChats />
            </Box>
            <Box
                component="section"
                sx={{
                    height: '60vh',
                    display: 'flex-col',
                    width: '75%',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ background: '#f0f2f5' }} elevation={0}>
                        <Toolbar>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <img
                                    src={profilepic}
                                    alt="PP"
                                    style={{ height: "45px", width: "45px", borderRadius: "65px" }}
                                />
                                <div
                                    style={{
                                        fontFamily: "arial",
                                        fontStyle: "normal",
                                        color: "black",
                                        alignSelf: "center",
                                    }}
                                >
                                    {selectedUser?.first_name}
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                padding: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: "background.default",
                                height: '71vh',
                            }}
                        >
                            <Chats />
                            <div ref={messagesEndRef} />
                        </Box>
                    </ThemeProvider>
                </Box>
                <Box
                    component="section"
                    sx={{
                        display: 'flex',
                    }}
                >
                    <TextField
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        variant="outlined"
                        rows={3}
                        sx={{
                            outline: 'none',
                            width: '95%',
                        }}
                        placeholder="Type a message..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <IconButton
                        color="primary"
                        style={{ marginLeft: '8px' }}
                        onClick={handleSendMessage}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default SendMessage;