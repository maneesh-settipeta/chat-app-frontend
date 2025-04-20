import { useContext, useEffect } from "react";
import ChatContext from "../Store/ChatContext";
import { Button, Grid2, TextField } from "@mui/material";
import { socket } from '../../socket.ts';
import axios from "axios";

const UserChats = () => {
    const { users, handleSelectedUser, addUsers, saveMessages } = useContext(ChatContext);

    const logged_in_user_uuid = localStorage.getItem("user_uuid");

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const getUsers = await axios.get(`${import.meta.env.VITE_BaseURL}getUsers`);
                addUsers(getUsers.data.data);
            } catch (error) {
                console.error("Error While Fetching Data", error);
            }
        }
        getUsersData();
    }, []);

    const handleSelectUser = async (receiver_uuid) => {
        saveMessages(true);
        const findUserName = users.find(user => user.user_uuid === receiver_uuid);
        handleSelectedUser(findUserName);
        socket.emit('joinChat', receiver_uuid, logged_in_user_uuid);
    }

    return (
        <>
            {users?.map((eachUser) => (
                <Grid2 onClick={() => handleSelectUser(eachUser.user_uuid)} sx={{
                    padding: '5px',
                    marginTop: '2px',
                    backgroundColor: '#ececec',
                }} key={eachUser.id}>
                    <p >
                        {eachUser.first_name} {eachUser.last_name}
                    </p>
                </Grid2>
            ))}
        </>
    )
}
export default UserChats;