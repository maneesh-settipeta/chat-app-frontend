import { useContext, useEffect } from "react";
import ChatContext from "../Store/ChatContext";
import { Grid2 } from "@mui/material";
import { socket } from '../../socket';
import axios from "axios";

interface User {
    id: string | null;
    user_uuid: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;


}

const UserChats = () => {
    const { users, handleSelectedUser, addUsers, saveMessages } = useContext(ChatContext);
    const logged_in_user_uuid = localStorage.getItem("user_uuid");

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const getUsers = await axios.get<{ data: User[] }>(`${import.meta.env.VITE_BaseURL}getUsers`);
                addUsers(getUsers.data.data);
            } catch (error) {
                console.error("Error While Fetching Data", error);
            }
        };
        getUsersData();
    }, []);

    const handleSelectUser = async (receiver_uuid: string) => {
        saveMessages();
        const findUserName = users?.find(user => user.user_uuid === receiver_uuid) || null;
        handleSelectedUser(findUserName);
        socket.emit('joinChat', receiver_uuid, logged_in_user_uuid);
    };

    return (
        <>
            {users?.map((eachUser) => (
                <Grid2
                    onClick={() => eachUser.user_uuid && handleSelectUser(eachUser.user_uuid)}
                    sx={{
                        padding: '5px',
                        marginTop: '2px',
                        backgroundColor: '#ececec',
                        cursor: 'pointer',
                    }}
                    key={eachUser.user_uuid}
                >
                    <p>
                        {eachUser.firstName} {eachUser.lastName}
                    </p>
                </Grid2>
            ))}
        </>
    );
};

export default UserChats;