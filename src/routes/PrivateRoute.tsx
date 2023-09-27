import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import {ROUTE_AUTH} from '../constants/routes';
import {getMe} from '../store/features/userSuncks';

export default function PrivateRoute() {
    const me = useSelector(getMe());
    return me ? <Outlet /> : <Navigate to={`/${ROUTE_AUTH}`} />;
}
