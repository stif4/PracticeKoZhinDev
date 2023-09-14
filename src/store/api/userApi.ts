import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL_AVATAR, URL_BASE, URL_USER} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import {IUserUpdateSent} from '../../shared/Forms/UpdateUserForm/UpdateUserForm';
import {setUser, logOut} from '../features/userSlice';
import {IErrorResponse, IUser} from './types';

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
        updateUser: builder.mutation<IUser, IUserUpdateSent>({
            query(data) {
                return {
                    url: `${URL_USER}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: data,
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    await dispatch(setUser(data));

                    if (args.avatar) {
                        await dispatch(userApi.endpoints.setAvatar.initiate(args.avatar));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        deleteUser: builder.mutation<null, null>({
            query() {
                return {
                    url: `${URL_USER}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    await dispatch(logOut());
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});
export const {useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation} = userApi;
