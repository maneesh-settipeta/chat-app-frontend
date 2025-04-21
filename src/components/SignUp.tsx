import { Paper, TextField, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpResponse {
    status: number;
    data: {
        msg: string;
    };
}

const SignUp = () => {
    const [firstname, setFirstName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{
        signUpError: boolean;
        signUpErrorMessage: string | null;
    }>({
        signUpError: false,
        signUpErrorMessage: null,
    });

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post<SignUpResponse>(
                `${import.meta.env.VITE_BaseURL}signUp`,
                { firstName: firstname, lastName: lastname, email: email, password: password }
            );

            if (response.status === 409) {
                setErrors({
                    signUpError: true,
                    signUpErrorMessage: response.data.msg,
                });
            } else if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error while saving data:", error);
            setErrors({
                signUpError: true,
                signUpErrorMessage: "Error While Creating User",
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={5} sx={{ maxHeight: '70vh', maxWidth: 300, padding: 4, marginTop: '50px' }}>
                <Typography textAlign="center" variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    variant="outlined"
                    label="Firstname"
                    placeholder="Please Enter Your Firstname"
                    fullWidth
                    required
                    sx={{ margin: '8px' }}
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Lastname"
                    placeholder="Please Enter Your Lastname"
                    fullWidth
                    required
                    sx={{ margin: '8px' }}
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                {errors.signUpError && (
                    <Typography color="error" sx={{ margin: '8px' }}>
                        {errors.signUpErrorMessage}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ margin: '8px' }}
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
                <Typography sx={{ margin: '8px' }}>
                    Already have an Account? <Link to='/login'>Sign In</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default SignUp;