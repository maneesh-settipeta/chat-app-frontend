import { useContext, useEffect } from "react";
import ChatContext from "../Store/ChatContext";
import { Grid2 } from "@mui/material";
import { socket } from '../../socket';
import axios from "axios";

interface User {
    id: string;
    user_uuid: string;
    first_name: string;
    last_name: string;
    email: string;
}

const UserChats = () => {
    const { users, handleSelectedUser, addUsers, saveMessages } = useContext(ChatContext) as {
        users: User[] | null;
        handleSelectedUser: (user: User | null) => void;
        addUsers: (users: User[]) => void;
        saveMessages: (isMessage: boolean) => void;
    };

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
    }, [addUsers]);

    const handleSelectUser = async (receiver_uuid: string) => {
        saveMessages(true);
        const findUserName = users?.find(user => user.user_uuid === receiver_uuid) || null;
        handleSelectedUser(findUserName);
        socket.emit('joinChat', receiver_uuid, logged_in_user_uuid);
    };

    return (
        <>
            {users?.map((eachUser) => (
                <Grid2
                    onClick={() => handleSelectUser(eachUser.user_uuid)}
                    sx={{
                        padding: '5px',
                        marginTop: '2px',
                        backgroundColor: '#ececec',
                        cursor: 'pointer',
                    }}
                    key={eachUser.id}
                >
                    <p>
                        {eachUser.first_name} {eachUser.last_name}
                    </p>
                </Grid2>
            ))}
        </>
    );
};

export default UserChats;