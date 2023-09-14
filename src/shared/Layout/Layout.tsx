import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {ROUTE_AUTH, ROUTE_HOME, ROUTE_NEWS} from '../../constants/routes';
import Header from '../Header';
import './Layout.scss';

const LAYOUT_CLASS_BASE = 'Layout';
const LAYOUT_CLASS_WHITE_BG = 'Layout Layout_bgWhite';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (location.pathname === ROUTE_HOME) {
            navigate(ROUTE_NEWS);
        }
    }, [location]);

    const getClassLayout = () => {
        if (location.pathname.includes(ROUTE_AUTH)) {
            return LAYOUT_CLASS_WHITE_BG;
        }
        return LAYOUT_CLASS_BASE;
    };

    return (
        <div className={getClassLayout()}>
            <div className="Layout__wrapper">
                <header className="Layout__header">
                    <Header />
                </header>

                <main className="Layout__main">
                    <div className="Layout__container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
