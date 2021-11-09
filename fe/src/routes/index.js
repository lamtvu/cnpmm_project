import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Navigate, useRoutes } from 'react-router-dom';
import DefaultLayout from '../layouts/defaultLayout'
import Login from "../views/login";
import Register from "../views/register";
import NotFound from '../views/notFound';
import Home from "../views/home";

export const mainRoutes = [
    { path: '/', element: <Navigate to='/home' /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    { path: '/home', element: <DefaultLayout />, children: [{ path: '', element: <Home /> }] }
]

