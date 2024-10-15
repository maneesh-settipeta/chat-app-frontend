
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AppBar, TextField, Toolbar, Typography } from "@mui/material";
import Chats from "./Chats";
import { socket } from "../../socket";
import UserChats from "./UserChats";
import ChatContext from "../Store/ChatContext";
import { useContext, useState, useEffect } from "react";

const SendMessage = () => {
    const { selectedUser , user } = useContext(ChatContext)
    
    console.log(user);
    console.log(selectedUser);
    
    
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {   
        console.log("17");
        socket.emit('sendMessage', {
            logged_in_user_uuid: user.user_uuid ,
            receiver_uuid: selectedUser.user_uuid,
            message: message,
        })
        setMessage("");
    }

    return (
        <Box sx={{ display: 'flex' , height:'80vh'}}>
            <Box sx={{ borderRight: '2px solid #ccc', overflowY:'auto',height: '100%'}}>
                <UserChats></UserChats>
            </Box>
            <Box>
                <Box component="section" sx={{
                    width: '72vw', display: 'flex-col', marginLeft: '4px',
                }}>

                    <Box sx={{
                        height: '72vh',
                        flexGrow: 1,
                        padding: 2,
                    }}>
                        <AppBar position="static" sx={{ background: '#dae0e0', marginBottom: '6px' }}>
                            <Toolbar>
                                <Typography variant="h6" sx={{ color: 'black' }}>
                                    {selectedUser?.first_name}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <Chats></Chats>
                    </Box>
                    <Box
                        component="section"
                        sx={{
                            height: '10vh',
                            display: 'flex',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            variant="outlined"
                            rows={3}
                            sx={{
                                height: '20px',
                                marginRight: '8px',
                                width: '70vw',
                            }}
                            placeholder="Type a message..."
                        />

                        <Button
                            variant="contained"
                            onClick={handleSendMessage}
                            sx={{
                                height: '50px',
                            }}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SendMessage;