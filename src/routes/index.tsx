import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Layout from '../shared/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'news',
                children: [
                    {
                        index: true,
                        element: <div>news!</div>,
                    },
                    {
                        path: 'create',
                        element: <div>Создать пост!</div>,
                    },
                    {
                        path: ':id',
                        element: <div>Определенный пост!</div>,
                    },
                    {
                        path: ':id/edit',
                        element: <div>Редактировать пост!</div>,
                    },
                ],
            },
            {
                path: 'auth',
                children: [
                    {
                        index: true,
                        element: <div>login!</div>,
                    },
                    {
                        path: 'register',
                        element: <div>register!</div>,
                    },
                ],
            },
            {
                path: 'user',
                children: [
                    {
                        index: true,
                        element: <div>profile!</div>,
                    },
                    {
                        path: 'edit',
                        element: <div>profile edit!</div>,
                    },
                    {
                        path: ':id',
                        element: <div>some user!</div>,
                    },
                    {
                        path: 'subscriptions',
                        element: <div>subscriptions!</div>,
                    },
                ],
            },
        ],
    },
]);
