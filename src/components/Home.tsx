import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

const Home = () => {

    return (
        <Box
            sx={{ height: 'screen', width: 'screen', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}
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