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
        // console.log(action.userDetails); 
        localStorage.setItem("firstName",action.userDetails?.first_name );
        localStorage.setItem("lastName",action.userDetails?.last_name );
        localStorage.setItem("email",action.userDetails?.email);
        localStorage.setItem("user_uuid" , action.userDetails?.user_uuid);
        return {
            ...state,
            user:{
                firstName: action.userDetails?.first_name ,
            lastName: action.userDetails?.last_name,
            email: action.userDetails?.email,
            user_uuid:  action.userDetails?.user_uuid,
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
            firstName: null,
            lastName:null,
            email: null,
            user_uuid:null,
        },
        users:null,
        selectedUser:null,
    })

    console.log(projectState.selectedUser);
    console.log(projectState.user);
    

    const addUser = (userData) => {
        console.log(userData);
        
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




