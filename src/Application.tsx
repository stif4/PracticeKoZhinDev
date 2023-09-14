import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import AppLoader from './hoc/AppLoader';
import router from './routes';
import './style/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
    return (
        <AppLoader>
            <RouterProvider router={router} />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </AppLoader>
    );
}
export default App;
