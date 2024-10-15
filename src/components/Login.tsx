import { Paper, TextField, Typography, Grid2, Button, Box } from "@mui/material";
import { Link, resolvePath } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatContext from "../Store/ChatContext";
import { useContext } from "react";


const Login = () => {
    const { addUser, addUsers } = useContext(ChatContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", { email: email, userpassword: password });
            console.log(response);
            
           if (response.status===202){
            addUser(response.data.data);
            console.log(response.data.data);
            
            console.log(response.data.user);
            try {
                const getUsersDetails = await axios.get("http://localhost:3000/getUsers");
                addUsers(getUsersDetails.data.data);
            } catch (error) {
                console.error("Error while fetching users", error);
            }
            navigate('/home');
           }
           if (response.status===401){
            alert("Invalid Creditianls");
           }
           
        }catch (error) {
            console.error(Error, "Error while saving data");
        }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={5} sx={{ maxHeight: '70vh', maxWidth: 300, padding: 4, marginTop: '50px' }}>
                <Grid2 textAlign='center'>
                    <h1>
                        Login
                    </h1>
                </Grid2>
                <Grid2 >
                    <TextField variant="outlined" label="Email" placeholder="Please Enter Your Email" fullWidth required sx={{ margin: '8px' }}
                        value={email} onChange={(e) => setEmail(e.target.value)}></TextField >
                    <TextField variant="outlined" label="Password" type="password" placeholder="Please Enter Your Password" fullWidth required sx={{ margin: '8px' }} value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                </Grid2>
                <Button type="submit" variant="contained" fullWidth color="primary" sx={{ margin: '8px' }} onClick={handleLogin}>Sign In</Button>
                <Typography sx={{ margin: '8px' }} >
                    <Link to='/forgotPassword'>
                        Forgot Password?
                    </Link>
                </Typography>
                <Typography sx={{ margin: '8px' }}>Don't have an  Account? <Link to='/signUp' >Sign up</Link></Typography>
            </Paper>
        </Box>
    )
}
export default Login;