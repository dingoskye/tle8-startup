import './index.css'
import {Routes, Route} from "react-router";
import Home from "./pages/home.jsx";
import Layout from "./layout.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
        </Routes>
    )
}

export default App
