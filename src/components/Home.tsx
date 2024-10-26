import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

const Home = () => {

    return (
        <Box
            sx={{ height: '95vh', width: '95vw', border: '2px solid #ccc', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}
        >
            <div >
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
        </Box>

    )

}
export default Home;