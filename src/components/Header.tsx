import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ChatContext from '../Store/ChatContext';

export default function Header() {
  const navigate = useNavigate();
  const { user } = useContext(ChatContext); // Access user details from context
  const [fullName, setFullName] = useState<string>('');
  console.log(fullName);


  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name ");
    localStorage.removeItem("email");
    localStorage.removeItem("user_uuid");
  };

  useEffect(() => {
    if (user.first_name && user.last_name) {
      setFullName(`${user.first_name[0]}${user.last_name[0]}`); // Set initials from context
    }
  }, [user]);

  return (
    <Box width="screen" height="screen" sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} style={{ backgroundColor: '#00A36C', color: 'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chats
          </Typography>
          <Button
            color="inherit"
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: 10,
              height: 40,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            {fullName}
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}