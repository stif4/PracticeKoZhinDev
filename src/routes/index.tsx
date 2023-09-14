import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {ROUTE_AUTH, ROUTE_HOME, ROUTE_NEWS, ROUTE_REGISTER, ROUTE_SUBSCRIPTIONS, ROUTE_USER} from '../constants/routes';
import AuthPage from '../pages/AuthPage/AuthPage';
import Profile from '../pages/Profile';
import Layout from '../shared/Layout';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: ROUTE_HOME,
        element: <Layout />,
        children: [
            {
                path: ROUTE_NEWS,
                children: [
                    {
                        index: true,
                        element: <></>,
                    },
                    {
                        path: ':id',
                        element: <div>Определенный пост!</div>,
                    },
                ],
            },
            {
                path: ROUTE_AUTH,
                children: [
                    {
                        index: true,
                        element: <AuthPage />,
                    },
                    {
                        path: ROUTE_REGISTER,
                        element: <AuthPage />,
                    },
                ],
            },
            {
                path: ROUTE_USER,
                element: <PrivateRoute />,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: ':id',
                        element: <div>some user!</div>,
                    },
                    {
                        path: ROUTE_SUBSCRIPTIONS,
                        element: <div>subscriptions!</div>,
                    },
                ],
            },
        ],
    },
]);
export default router;
