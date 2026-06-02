import './index.css'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import CreateGroup from "./pages/CreateGroup.jsx";

function Layout() {
    return <Outlet/>;
}

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {


                path: "/creategroup",
                element: <CreateGroup/>,
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App
