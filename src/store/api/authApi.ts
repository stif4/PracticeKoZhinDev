import {createApi, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import jwt from 'jwt-decode';
import {TLoginInput} from '../../shared/Forms/LoginForm/LoginForm';
import {TRegisterInput} from '../../shared/Forms/RegisterForm/RegisterForm';
import {IErrorResponse, IGenericResponse, IJWTDecode, IResponceLogin} from './types';
import {userApi} from './userApi';
import coockiesService from '../../service/coockies.service';
import {URL_LOGIN, URL_REFRESH, URL_REGISTER} from '../../constants/api';

const URL_BASE = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_BASE}`,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<IGenericResponse, TRegisterInput>({
            query(data) {
                return {
                    url: `${URL_REGISTER}`,
                    method: 'POST',
                    body: data,
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    await dispatch(authApi.endpoints.loginUser.initiate({password: args.password, email: args.email}));
                    if (args.avatar !== null) {
                        await dispatch(userApi.endpoints.setAvatar.initiate(args.avatar));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        loginUser: builder.mutation<IResponceLogin, TLoginInput>({
            query(data) {
                return {
                    url: `${URL_LOGIN}`,
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const tokens = (await queryFulfilled).data;
                    const user: IJWTDecode = jwt(tokens.accessToken);
                    coockiesService().setTookens({tokens, user});
                    if (user) {
                        await dispatch(userApi.endpoints.getUser.initiate(user.id));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        refresh: builder.mutation<{accessToken: string}, null | boolean>({
            query() {
                const data = {refreshToken: coockiesService().getRefreshtoken()};
                return {
                    url: `${URL_REFRESH}`,
                    method: 'POST',
                    credentials: 'include',
                    body: data,
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const newTokenAccess = (await queryFulfilled).data.accessToken;
                        const user: IJWTDecode = jwt(newTokenAccess);
                        const oldTokenRefresh = coockiesService().getRefreshtoken();
                        const tokens = {accessToken: newTokenAccess, refreshToken: oldTokenRefresh};
                        coockiesService().setTookens({tokens, user});
                        if (user) {
                            await dispatch(userApi.endpoints.getUser.initiate(user.id));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
    }),
});
export const {useLoginUserMutation, useRegisterUserMutation, useRefreshMutation} = authApi;
