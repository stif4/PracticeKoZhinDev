import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL_AVATAR, URL_USER} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import {setUser} from '../features/userSlice';
import {IUser} from './types';

const URL_BASE = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_BASE}`,
        prepareHeaders: (headers) => {
            const token = coockiesService().getAcesstoken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<IUser, number | null>({
            query(id) {
                return {
                    url: `${URL_USER}/${id}`,
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        setAvatar: builder.mutation<IUser, FormData>({
            query(data) {
                return {
                    url: `${URL_AVATAR}`,
                    method: 'POST',
                    credentials: 'include',
                    body: data,
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});
export const {useGetUserQuery} = userApi;
