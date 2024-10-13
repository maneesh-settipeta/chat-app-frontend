import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Login from "./Login"
import SendMessage from "./SendMessage"
import SignUp from "./SignUp"
import Home from "./Home"


const RoutingComponent = createBrowserRouter([
    {
        path:'/',
        element:<Navigate to ='/login'/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signUp',
        element:<SignUp/>
    },

    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:"",
                element:<SendMessage/>
            }
        ]
    }
])

const Routing  = () =>{
return(
    <RouterProvider router={RoutingComponent}></RouterProvider>
)
}
export default Routing