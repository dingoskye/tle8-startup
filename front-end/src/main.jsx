import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {ApiProvider} from "@/context/api-context.jsx";
import {MainTaskProvider} from "@/context/task-context.jsx";
import {GroupProvider} from "@/context/group-context.jsx";

createRoot(document.getElementById('root')).render(
    <ApiProvider>
        <MainTaskProvider>
            <GroupProvider>
                <StrictMode>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </StrictMode>
            </GroupProvider>
        </MainTaskProvider>
    </ApiProvider>
)
