import { Navigate } from 'react-router-dom';
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
import CreateProduct from "../views/createProduct";
import UpdateProduct from '../views/updateProduct';
import Orders from '../views/orders';
import Discounts from '../views/discounts';
import Cart from '../views/cart';
import ProductDetail from '../views/productDetail';
import MyOrder from '../views/myOrder';
import Information from '../views/information';
import OrderDetail from '../views/orderDetail';
import CreateDiscount from '../views/createDiscount';
import EditDiscount from '../views/editDiscount';
import ChangeInfor from '../views/changeInfor';
import ChangePassword from '../views/changePassword';
import Shop from '../components/shop';
import ShopSearch from '../components/shopSearch';

export const mainRoutes = (auth) => [
    { path: '/home', element: <Navigate to='/' /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    {
        path: '/', element: auth?.role !== 0 ? < DefaultLayout /> : <Navigate to='/admin' />,
        children: [
            { path: '', element: <Home /> },
            { path: 'cart', element: <Cart /> },
            { path: 'products', element: <Shop /> },
            { path: 'products-search/:searchStr', element: <ShopSearch /> },
            { path: 'product/:productId', element: <ProductDetail /> },
            { path: '*', element: <Navigate to='/404' /> }
        ]
    },
    { path: '*', element: <Navigate to='/404' /> }
]

export const customerRoutes = (auth) => {
    return [
        {
            path: 'user',
            element: auth && auth.role === 1 ? <DefaultLayout /> : <Navigate to='/' />,
            children: [
                { path: '', element: <Navigate to='/user/my-orders' /> },
                { path: 'my-orders', element: <MyOrder /> },
                { path: 'order-detail/:id', element: <OrderDetail /> },
                { path: 'information', element: <Information /> },
                { path: 'change-information', element: <ChangeInfor /> },
                { path: 'change-password', element: <ChangePassword /> }
            ]
        }
    ]
}

export const adminRoutes = (auth) => {
    return [
        {
            path: 'admin',
            element: auth && auth.role === 0 ? <AdminLayout /> : <Navigate to='/home' />,
            children: [
                { path: '', element: <Navigate to='/admin/categories' /> },
                { path: 'categories', element: <Categories /> },
                { path: 'brands', element: <Brands /> },
                { path: 'products', element: <Products /> },
                { path: 'create-product', element: <CreateProduct /> },
                { path: 'update-product/:productId', element: <UpdateProduct /> },
                { path: 'customers', element: <Customers /> },
                { path: 'orders', element: <Orders /> },
                { path: 'order-detail/:id', element: <OrderDetail /> },
                { path: 'discounts', element: <Discounts /> },
                { path: 'create-discount', element: <CreateDiscount /> },
                { path: 'update-discount/:id', element: <EditDiscount /> }
            ]
        }
    ]

}
