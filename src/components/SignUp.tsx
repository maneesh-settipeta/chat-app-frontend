import { Paper, TextField, Typography, Grid2, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        signUpError: null,
        signUpErrorMessage: null,
    })

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BaseURL}signUp`, { firstName: firstname, lastName: lastname, email: email, password: password });
            if (response.status === 409) {
                setErrors((prevState) => ({
                    ...prevState,
                    signUpError: true,
                    signUpErrorMessage: response.data.msg,
                }));
            }
            if (response.status === 201) {
                navigate('/login')
            }

        } catch (error) {
            console.error(Error, "Error while saving data");
            alert("Error While Creating User");
        }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={5} sx={{ maxHeight: '70vh', maxWidth: 300, padding: 4, marginTop: '50px' }}>
                <Grid2 textAlign='center'>
                    <h1>
                        Sign Up
                    </h1>
                </Grid2>
                <Grid2 >
                    <TextField variant="outlined" label="Firstname" placeholder="Please Enter Your Firstname" fullWidth required sx={{ margin: '8px' }} value={firstname} onChange={(e) => setFirstName(e.target.value)}></TextField>
                    <TextField variant="outlined" label="Lastname" placeholder="Please Enter Your Lastname" fullWidth required sx={{ margin: '8px' }} value={lastname} onChange={(e) => setLastName(e.target.value)}></TextField>
                    <TextField variant="outlined" label="Email" placeholder="Please Enter Your Email" fullWidth required sx={{ margin: '8px' }}
                        value={email} onChange={(e) => setEmail(e.target.value)}></TextField >
                    <TextField variant="outlined" label="Password" type="password" placeholder="Please Enter Your password" fullWidth required sx={{ margin: '8px' }} value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                    {errors.signUpError ? <p>{errors.signUpErrorMessage}</p> : null}
                </Grid2>
                <Button type="submit" variant="contained" fullWidth color="primary" sx={{ margin: '8px' }} onClick={handleSignUp}>Sign up</Button>
                <Typography sx={{ margin: '8px' }}>Already  have an  Account? <Link to='/login' >Sign In</Link></Typography>
            </Paper>
        </Box>
    )
}
export default SignUp;