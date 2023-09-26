import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import jwt from 'jwt-decode';
import {TLoginInput, ECheck} from '../../shared/Forms/LoginForm/LoginForm';
import {TRegisterInput} from '../../shared/Forms/RegisterForm/RegisterForm';
import {IErrorResponse, IGenericResponse, IJWTDecode, IResponceLogin} from './types';
import {userApi} from './userApi';
import coockiesService from '../../service/coockies.service';
import {URL_BASE, URL_LOGIN, URL_REFRESH, URL_REGISTER} from '../../constants/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_BASE}`,
    }),
    endpoints: (builder) => ({
        register: builder.mutation<IGenericResponse, TRegisterInput>({
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
                    await dispatch(authApi.endpoints.login.initiate({password: args.password, email: args.email, remember: ECheck.unchecked}));
                    if (args.img !== null) {
                        await dispatch(userApi.endpoints.setAvatar.initiate(args.img));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        login: builder.mutation<IResponceLogin, TLoginInput>({
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
                    const accessDecod: IJWTDecode = jwt(tokens.accessToken);
                    const refreshDecod: IJWTDecode = jwt(tokens.accessToken);
                    const authData = {
                        userId: accessDecod.id,
                        accessExp: accessDecod.iat,
                        refreshExp: refreshDecod.exp,
                        refresh: tokens.refreshToken,
                        access: tokens.accessToken,
                        remember: args.remember,
                    };
                    coockiesService().setTookens(authData);
                    if (accessDecod) {
                        await dispatch(userApi.endpoints.getUser.initiate(accessDecod.id));
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
                        const accessDecod: IJWTDecode = jwt(newTokenAccess);
                        const authData = {
                            userId: accessDecod.id,
                            accessExp: accessDecod.iat,
                            access: newTokenAccess,
                        };
                        coockiesService().setTookens(authData);
                        if (accessDecod) {
                            await dispatch(userApi.endpoints.getUser.initiate(accessDecod.id));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
    }),
});
export const {useLoginMutation, useRegisterMutation, useRefreshMutation} = authApi;
