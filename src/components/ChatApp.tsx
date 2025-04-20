import React from 'react';
import { createTheme, ThemeProvider, Box, Typography, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Define a custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#e5ddd5', // WhatsApp background color
    },
    primary: {
      main: '#128c7e', // WhatsApp's signature green
    },
    secondary: {
      main: '#25d366', // WhatsApp's green accent (e.g., send button)
    },
    chatBubble: {
      sent: '#dcf8c6', // Light green for sent messages
      received: '#ffffff', // White for received messages
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

const messages = [
  { sender: 'me', text: 'Hey, how are you?', time: '10:00 AM' },
  { sender: 'friend', text: 'I am good, thanks! How about you?', time: '10:01 AM' },
];

const ChatApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'background.default',
        padding: 2
      }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              {msg.sender === 'friend' && <Avatar alt="Friend" src="/static/images/avatar/1.jpg" sx={{ mr: 1 }} />}
              <Box
                sx={{
                  maxWidth: '60%',
                  padding: 1.5,
                  borderRadius: 2,
                  backgroundColor: msg.sender === 'me' ? 'chatBubble.sent' : 'chatBubble.received', // Using custom colors from the theme
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                <Typography variant="caption" align="right" sx={{ display: 'block', mt: 0.5 }}>
                  {msg.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', p: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            sx={{ mr: 1, backgroundColor: '#fff', borderRadius: '30px' }}
          />
          <IconButton color="secondary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatApp;