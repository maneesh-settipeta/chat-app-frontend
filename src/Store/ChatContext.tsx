import { createContext, useReducer } from "react";

export const ChatContext = createContext({
user:{},
users:null,
selectedUser:null,
addUser:()=>{},
addUsers:()=>{},
handleSelectedUser :()=>{},
});

const handleStateAndData = (state, action) => {
    if (action.type === "ADD-USER") {
        localStorage.setItem("firstName",action.userDetails.first_name );
        localStorage.setItem("lastName",action.userDetails.last_name );
        localStorage.setItem("email",action.userDetails.email);
        return {
            ...state,
            user: {
                userUuid: action.userDetails.user_uuid,
            }
        }
    }
    if (action.type==="ADD-USERS"){
      return{
        ...state,
        users:action.usersDetails,
      }
    }
    if (action.type==='SELECTED-USER'){
        return{
            ...state,
            selectedUser:action.userSelected,
        }
    }

    else{
        return {
            state,
        }
    }
}

export function ProjectContext({ children }) {
    const [projectState, projectDispatchFunction] = useReducer(handleStateAndData, {
        user: {
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            email: localStorage.getItem("email"),
            userUuid: null,
        },
        users:null,
        selectedUser:null,
    })
console.log(projectState.selectedUser);

    

    const addUser = (userData) => {
        projectDispatchFunction({
            type: "ADD-USER",
            userDetails: userData
        })
    }

    const addUsers = (usersData) =>{
        projectDispatchFunction({
            type:"ADD-USERS",
            usersDetails:usersData
        })
    }

    const handleSelectedUser = (user_uuid) =>{
        projectDispatchFunction({
            type:"SELECTED-USER",
            userSelected:user_uuid,
        })
    }
    const projectData = {
        user: projectState.user,
        users:projectState.users,
        selectedUser:projectState.selectedUser,
        addUser,
        addUsers,
        handleSelectedUser,
    }

    return (
        <>
            <ChatContext.Provider value={projectData}>{children}</ChatContext.Provider>
        </>
    )
}

export default ChatContext;




