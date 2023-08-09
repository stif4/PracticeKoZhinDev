import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {router} from './routes';
import Layout from './shared/Layout';
import './style/index.scss';

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
export default App;
