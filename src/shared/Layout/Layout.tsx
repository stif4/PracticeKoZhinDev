import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Header from '../../components/Header';
import './Layout.scss';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (location.pathname === '/') {
            navigate('/news');
        }
    }, [location]);

    return (
        <div className="Layout">
            <div>
                <Header />
                <Outlet />
            </div>
        </div>
    );
}
