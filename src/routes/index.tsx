import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import CheckBox from '../components/CheckBox/CheckBox';
import Layout from '../shared/Layout';

const handleClick = () => {};
const onKeyPressHandler = () => {};

const PATH_ICON_FILL = '/icons/bigcHeckBox.svg';
const PATH_ICON_EMPTY = '/icons/bigCheckBoxEmpty.svg';
const pathIcons = [PATH_ICON_EMPTY, PATH_ICON_FILL];

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
                        element: (
                            <CheckBox
                                onClick={handleClick}
                                value={1}
                                label="asf"
                                id="1123"
                                tabIndex={-1}
                                onKeyPressHandler={onKeyPressHandler}
                                pathIcons={pathIcons}
                            />
                        ),
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
