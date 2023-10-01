import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL_BASE, URL_USER} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import {IUserUpdateSent} from '../../shared/Forms/UpdateUserForm/UpdateUserForm';
import {setUser} from '../features/userSlice';
import {logOut} from '../features/userSuncks';
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
        getUser: builder.query<IUser, {id: number | null; isMe?: boolean}>({
            query({id}) {
                return {
                    url: `${URL_USER.DEFUALT}/${id}`,
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    if (args.isMe) {
                        dispatch(setUser(data));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['User'],
        }),
        setAvatar: builder.mutation<IUser, FormData>({
            query(data) {
                return {
                    url: `${URL_USER.AVATAR}`,
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
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<IUser, IUserUpdateSent>({
            query(data) {
                const dataSent = {...data};
                delete dataSent.avatar;
                return {
                    url: `${URL_USER.DEFUALT}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: dataSent,
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
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<null, null>({
            query() {
                return {
                    url: `${URL_USER.DEFUALT}`,
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
        pinPost: builder.mutation<IUser, number>({
            query(id) {
                return {
                    url: `${URL_USER.PIN_POST}/${id}`,
                    method: 'PATCH',
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
        unpinPost: builder.mutation<IUser, null>({
            query() {
                return {
                    url: `${URL_USER.UNPIN_POST}`,
                    method: 'PATCH',
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
    }),
});
export const {useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, usePinPostMutation, useUnpinPostMutation} = userApi;
