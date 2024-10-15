import { useContext, useEffect } from "react";
import ChatContext from "../Store/ChatContext";
import { Button, Grid2, TextField } from "@mui/material";
import { socket} from '../../socket.ts';
import axios from "axios";

const UserChats = () => {
    const { users, handleSelectedUser, addUsers } = useContext(ChatContext);

    useEffect(()=>{
    const getUsersData =async()=>{
        try {
            const getUsers = await axios.get('http://localhost:3000/getUsers');
            addUsers(getUsers.data.data);
        } catch (error) {
            console.error("Error While Fetching Data", error);
        }
    }
    getUsersData();
    },[])


    const handleSelectUser = (user_uuid) => {
        const findUserName = users.find(user => user.user_uuid === user_uuid);

        handleSelectedUser(findUserName);
        console.log(user_uuid);
        
        socket.emit('joinChat', user_uuid);
    }

    return (
        <>
            {users?.map((eachUser) => (
                <Grid2 onClick={() => handleSelectUser(eachUser.user_uuid)} sx={{
                    paddingBottom: '10px',
                    backgroundColor: '#ececec',
                    borderRadius: '8px',
                    marginRight: '3px',
                    paddingLeft: '4px',
                    paddingTop: '2px',
                    marginBottom: '4px',
                    width: '25vw'
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