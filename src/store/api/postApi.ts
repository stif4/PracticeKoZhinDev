import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL_BASE, URL_LIKEPOST, URL_MYPOST} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import {IPost} from './types';

export const postApi = createApi({
    reducerPath: 'postApi',
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
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getMyPosts: builder.query<IPost[], null>({
            query() {
                return {
                    url: `${URL_MYPOST}`,
                    credentials: 'include',
                };
            },
        }),
        toggleLike: builder.mutation<{likesCount: number}, number>({
            query(id) {
                return {
                    url: URL_LIKEPOST(id),
                    method: 'POST',
                    credentials: 'include',
                };
            },
        }),
    }),
});
export const {useGetMyPostsQuery, useToggleLikeMutation} = postApi;
