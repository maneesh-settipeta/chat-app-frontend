import { useContext, useEffect } from "react";
import ChatContext from "../Store/ChatContext";
import { Grid2 } from "@mui/material";
import { socket } from '../../socket';
import axios from "axios";

type User = {
    id: string | null;
    user_uuid: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
}

const UserChats = () => {
    const { users, handleSelectedUser, addUsers, saveMessages } = useContext(ChatContext);
    console.log(users);

    const logged_in_user_uuid = localStorage.getItem("user_uuid");

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const getUsers = await axios.get<{ data: User[] }>(`${import.meta.env.VITE_BaseURL}getUsers`);
                addUsers(getUsers.data.data);
                console.log(getUsers);

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

    // if (users && users.length === 0 && <p>No Users Found</p>)

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
                    <p>{eachUser?.first_name} {eachUser?.last_name}</p>
                </Grid2>
            ))}
        </>
    );
};

export default UserChats;