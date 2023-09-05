import React from 'react';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import {Navigate, Outlet} from 'react-router-dom';
import coockiesService from '../service/coockies.service';
import {useGetUserQuery} from '../store/api/userApi';
import {ROUTE_AUTH} from '../constants/routes';

export default function PrivateRoute() {
    const userId = coockiesService().getUserId();
    const {isLoading, currentData: user} = useGetUserQuery(userId ? Number(userId) : skipToken);
    if (isLoading) {
        return <div>...Loading</div>;
    }
    return user ? <Outlet /> : <Navigate to={ROUTE_AUTH} />;
}
