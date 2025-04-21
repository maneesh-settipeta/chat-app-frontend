import { createContext, useReducer, ReactNode } from "react";

// Define types for the state and actions
interface User {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    user_uuid: string | null;
}

interface StateType {
    user: User;
    users: User[] | null;
    selectedUser: User | null;
    isMessage: boolean;
}

interface ActionType {
    type: string;
    userDetails?: User;
    usersDetails?: User[];
    userSelected?: User | null;
    messagesData?: boolean;
}

// Define the context type
interface ChatContextType {
    user: StateType["user"];
    users: StateType["users"];
    selectedUser: StateType["selectedUser"];
    isMessage: boolean;
    addUser: (userData: User) => void;
    addUsers: (usersData: User[]) => void;
    handleSelectedUser: (user: User | null) => void;
    saveMessages: () => void;
}

// Create the context with proper typing
export const ChatContext = createContext<ChatContextType>({
    user: {
        firstName: null,
        lastName: null,
        email: null,
        user_uuid: null,
    },
    users: null,
    selectedUser: null,
    isMessage: false,
    addUser: () => { },
    addUsers: () => { },
    handleSelectedUser: () => { },
    saveMessages: () => { },
});


// Reducer function with proper typing
const handleStateAndData = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "ADD-USER":
            if (action.userDetails) {
                localStorage.setItem("firstName", action.userDetails.firstName || "");
                localStorage.setItem("lastName", action.userDetails.lastName || "");
                localStorage.setItem("email", action.userDetails.email || "");
                localStorage.setItem("user_uuid", action.userDetails.user_uuid || "");
            }
            return {
                ...state,
                user: {
                    firstName: action.userDetails?.firstName || null,
                    lastName: action.userDetails?.lastName || null,
                    email: action.userDetails?.email || null,
                    user_uuid: action.userDetails?.user_uuid || null,
                },
            };

        case "ADD-USERS":
            return {
                ...state,
                users: action.usersDetails || null,
            };

        case "SELECTED-USER":
            return {
                ...state,
                selectedUser: action.userSelected || null,
            };

        case "IS-MESSAGE":
            return {
                ...state,
                isMessage: action.messagesData || false,
            };

        default:
            return state;
    }
};

// Define props for the ProjectContext component
interface ProjectContextProps {
    children: ReactNode;
}

export function ProjectContext({ children }: ProjectContextProps) {
    const [projectState, projectDispatchFunction] = useReducer(handleStateAndData, {
        user: {
            firstName: null,
            lastName: null,
            email: null,
            user_uuid: null,
        },
        users: null,
        selectedUser: null,
        isMessage: false,
    });

    console.log(projectState.user);


    const addUser = (userData: User) => {
        projectDispatchFunction({
            type: "ADD-USER",
            userDetails: userData,
        });
    };

    const addUsers = (usersData: User[]) => {
        projectDispatchFunction({
            type: "ADD-USERS",
            usersDetails: usersData,
        });
    };

    const handleSelectedUser = (user: User | null) => {
        projectDispatchFunction({
            type: "SELECTED-USER",
            userSelected: user,
        });
    };

    const saveMessages = () => {
        projectDispatchFunction({
            type: "IS-MESSAGE",
            messagesData: true,
        });
    };

    const projectData: ChatContextType = {
        user: projectState.user,
        users: projectState.users,
        selectedUser: projectState.selectedUser,
        isMessage: projectState.isMessage,
        addUser,
        addUsers,
        handleSelectedUser,
        saveMessages,
    };

    return (
        <ChatContext.Provider value={projectData}>{children}</ChatContext.Provider>
    );
}

export default ChatContext;