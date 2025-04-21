import { Paper, TextField, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatContext from "../Store/ChatContext";
import { useContext } from "react";

interface LoginResponse {
    data: {
        first_name: string;
        last_name: string;
        email: string;
        user_uuid: string;
    };
}

interface UsersResponse {
    data: Array<{
        first_name: string;
        last_name: string;
        email: string;
        user_uuid: string;
    }>;
}

const Login = () => {
    const { addUser, addUsers } = useContext(ChatContext);

    const navigate = useNavigate();

    const [errors, setErrors] = useState<{ isError: boolean; errorMessage: string | null }>({
        isError: false,
        errorMessage: null,
    });

    const [email, setEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const response = await axios.post<LoginResponse>(
                `http://localhost:5000/login`,
                { email: email, userpassword: password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);

            if (response.status === 202) {
                addUser({
                    firstName: response.data.data.first_name,
                    lastName: response.data.data.last_name,
                    email: response.data.data.email,
                    user_uuid: response.data.data.user_uuid,
                });
                const getUsersDetails = await axios.get<UsersResponse>(
                    `${import.meta.env.VITE_BaseURL}getUsers`
                );
                addUsers(getUsersDetails.data.data.map(user => ({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    user_uuid: user.user_uuid,
                })));
                navigate('/home');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setErrors({
                        isError: true,
                        errorMessage: "Invalid Credentials",
                    });
                } else if (error.response?.status === 404) {
                    setErrors({
                        isError: true,
                        errorMessage: "User not found",
                    });
                } else {
                    setErrors({
                        isError: true,
                        errorMessage: error.response?.data?.msg || "Network Error",
                    });
                }
            } else {
                setErrors({
                    isError: true,
                    errorMessage: "An unexpected error occurred",
                });
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={5} sx={{ maxHeight: '70vh', maxWidth: 300, padding: 4, marginTop: '50px' }}>
                <Typography textAlign="center" variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    variant="outlined"
                    label="Email"
                    placeholder="Please Enter Your Email"
                    fullWidth
                    required
                    sx={{ margin: '8px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    placeholder="Please Enter Your Password"
                    fullWidth
                    required
                    sx={{ margin: '8px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.isError && <Typography color="error">{errors.errorMessage}</Typography>}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        margin: '8px',
                        bgcolor: '#90EE90',
                        '&:hover': { bgcolor: '#81D48D' },
                        color: '#000',
                    }}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Typography sx={{ margin: '8px' }}>
                    <Link to='/forgotPassword'>Forgot Password?</Link>
                </Typography>
                <Typography sx={{ margin: '8px' }}>
                    Don't have an Account? <Link to='/signUp'>Sign up</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;