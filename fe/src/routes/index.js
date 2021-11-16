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
import AdminLayout from "../layouts/adminLayout";
import Categories from "../views/categories";
import Brands from "../views/brands";
import Products from "../views/products";
import Customers from "../views/customers";

export const mainRoutes = [
    { path: '/', element: <Navigate to='/home' /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    {
        path: 'home', element: <DefaultLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: '*', element: <Navigate to='/404' /> }
        ]
    },
    { path: '*', element: <Navigate to='/404' /> }
]

export const adminRoutes = (auth) => {
    return [
        {
            path: 'admin',
            element: auth && auth.role === 0 ? <AdminLayout /> : <Navigate to='/' />,
            children: [
                { path: '', element: <Navigate to='/admin/categories' /> },
                { path: 'categories', element: <Categories /> },
                { path: 'brands', element: <Brands /> },
                { path: 'products', element: <Products /> },
                { path: 'customers', element: <Customers /> }
            ]
        }
    ]

}
