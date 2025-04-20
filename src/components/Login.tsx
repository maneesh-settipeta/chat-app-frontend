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
    const [errors, setErrors] = useState({
        isError: false,
        errorMessage: null,
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/login`,
                { email: email, userpassword: password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 202) {
                addUser(response.data.data);
                const getUsersDetails = await axios.get(`${import.meta.env.VITE_BaseURL}getUsers`);
                addUsers(getUsersDetails.data.data);
                navigate('/home');

            }
        } catch (error) {
            if (error.response.status === 401) {
                setErrors({
                    isError: true,
                    errorMessage: "Invalid Credentials",
                });
            } if (error.response.status === 404) {
                setErrors({
                    isError: true,
                    errorMessage: "User not found",
                });
            }
            else {
                setErrors({
                    isError: true,
                    errorMessage: error.response.data.msg || "Network Error",
                });
            }
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
                {errors.isError === true ? <h1>{errors.errorMessage}</h1> : null}
                <Button type="submit" variant="contained" fullWidth sx={{

                    margin: '8px',
                    bgcolor: '#90EE90',

                    '&:hover': { bgcolor: '#81D48D' },
                    color: '#000',
                }} onClick={handleLogin}>Sign In</Button>
                <Typography sx={{ margin: '8px' }} >
                    <Link to='/forgotPassword'>
                        Forgot Password?
                    </Link>
                </Typography>
                <Typography sx={{ margin: '8px', }}>Don't have an  Account? <Link to='/signUp' >Sign up</Link></Typography>
            </Paper>
        </Box>
    )
}
export default Login;