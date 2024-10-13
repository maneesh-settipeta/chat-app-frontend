
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect } from 'react';
import ChatContext from '../Store/ChatContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const {user } = useContext(ChatContext);


 const navigate = useNavigate();
  const firstName =localStorage.getItem("firstName");
  const lastName= localStorage.getItem("lastName");

  const firstNameExtract = user?.firstName ? user?.firstName[0] : "";
  const secondNameExtract = user?.lastName ? user?.lastName[0] : "";

  const handleLogout = () =>{
    navigate('/login');
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
  }

  
  return (
    <Box height='10vh' sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Button color="inherit" sx={{
             backgroundColor: '#f5f5f5', 
             color: '#000',              
             fontWeight: 'bold',        
             borderRadius: '50%',        
             width: 10,               
             height: 40,                 
             '&:hover': {              
               backgroundColor: '#e0e0e0',
             }
          }}> {firstName[0] +""+lastName[0]}</Button>
          <Button color="inherit" onClick={handleLogout}> Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

