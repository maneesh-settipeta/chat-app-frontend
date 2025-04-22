import { io } from "socket.io-client"

export const socket = io("wss://chat-app.maneeshsettipeta.tech/",
    {
        transports: ["websocket"],
    }
);

