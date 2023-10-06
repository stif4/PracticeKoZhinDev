import {createApi, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {URL_BASE, URL_USER} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import {IUserUpdateSent} from '../../shared/Forms/UpdateUserForm/UpdateUserForm';
import getQuerySeartchTransformed, {IVariantQuerySeartchUser} from '../../utils/querySeartchTransformed';
import {setUser} from '../features/userSlice';
import {logOut} from '../features/userSuncks';
import {IErrorResponse, IUser, IUserById} from './types';

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
        getUser: builder.query<IUserById, {id: number | null; isMe?: boolean}>({
            query({id}) {
                return {
                    url: `${URL_USER.DEFUALT}/${id}`,
                    credentials: 'include',
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
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
        setAvatar: builder.mutation<IUserById, FormData>({
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
        updateUser: builder.mutation<IUserById, IUserUpdateSent>({
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
        getUsers: builder.query<IUser[], {page: number; querySeartch: string}>({
            async queryFn({page, querySeartch}, _queryApi, _extraOptions, fetchWithBQ) {
                const baseQueryForRequest = `page=${page}&pageSize=10`;

                const getQuery = ({lastName, firstName, nickname}: IVariantQuerySeartchUser) => {
                    if (lastName || firstName) {
                        if (lastName && firstName) {
                            return `${baseQueryForRequest}&firstName=${firstName}&lastName=${lastName}`;
                        }
                        if (lastName) {
                            return `${baseQueryForRequest}&lastName=${lastName}`;
                        }
                        if (firstName) {
                            return `${baseQueryForRequest}&firstName=${firstName}`;
                        }
                    }
                    if (nickname) {
                        return `${baseQueryForRequest}&nickname=${nickname}`;
                    }
                    return `${baseQueryForRequest}`;
                };

                const fetchData = async (query: string) => {
                    try {
                        const userRes = await fetchWithBQ(`${URL_USER.DEFUALT}?${query}`);
                        return {data: userRes.data as IUser[], error: null};
                    } catch (error) {
                        const err = error as FetchBaseQueryError;
                        return {data: undefined, error: err};
                    }
                };

                const getUsers = async (variantsQuery: '' | IVariantQuerySeartchUser[]) => {
                    if (!variantsQuery) {
                        const usersRes = await fetchData(baseQueryForRequest);
                        return usersRes;
                    }

                    const usersSlicesRes = await Promise.all(
                        variantsQuery.map(async (variant) => {
                            const usersSliceRes = await fetchData(getQuery(variant));
                            return usersSliceRes;
                        }),
                    );

                    const withError = usersSlicesRes.find((userRes) => userRes.error !== null);
                    if (withError) {
                        return {data: undefined, error: withError.error};
                    }

                    const usersListRes = usersSlicesRes.map((user) => user.data).flat(1) as IUser[];
                    return {data: usersListRes, error: null};
                };

                const variantsQuery = getQuerySeartchTransformed(querySeartch);
                const userRes = await getUsers(variantsQuery);

                if (userRes.error) {
                    return {error: userRes.error};
                }

                return {data: userRes.data as IUser[]};
            },

            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            },

            providesTags: ['User'],
        }),
        subscribe: builder.mutation<IUserById, number>({
            query(id) {
                return {
                    url: URL_USER.SUBSCRIBE(id),
                    method: 'POST',
                    credentials: 'include',
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
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
        deliteSubscribe: builder.mutation<IUserById, number>({
            query(id) {
                return {
                    url: URL_USER.SUBSCRIBE(id),
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
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
        pinPost: builder.mutation<IUserById, number>({
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
        unpinPost: builder.mutation<IUserById, null>({
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
export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    usePinPostMutation,
    useUnpinPostMutation,
    useLazyGetUsersQuery,
    useDeliteSubscribeMutation,
    useSubscribeMutation,
} = userApi;
