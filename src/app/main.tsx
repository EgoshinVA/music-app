import {createRoot} from 'react-dom/client'
import '@/shared/styles/index.css'
import App from "@/app/app";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter><App/></BrowserRouter>
)
