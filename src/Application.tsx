import React from 'react';
import {RouterProvider} from 'react-router-dom';
import AppLoader from './hoc/AppLoader';
import router from './routes';
import './style/index.scss';

function App() {
    return (
        <AppLoader>
            <RouterProvider router={router} />
        </AppLoader>
    );
}
export default App;
