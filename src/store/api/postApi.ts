import {createApi, fetchBaseQuery, FetchBaseQueryMeta} from '@reduxjs/toolkit/query/react';
import {URL_BASE, URL_LIKEPOST, URL_MYPOST, URL_POST, URL_POST_IMG, URL_TAGS} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import {TCreateInput} from '../../shared/Forms/CreatePostForm/CreatePostFrorm';
import {postLiked} from '../features/userSlice';
import {setPosts} from '../features/userSuncks';
import {IErrorResponse, IPost, ITag, ITagNormolaized} from './types';

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
        getMyPosts: builder.query({
            query(page: number) {
                return {
                    url: `${URL_MYPOST}?page=${page}&pageSize=5`,
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(setPosts(data));
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            // Задача на будующие: найти способ, как смерджить теги, чтоб после обновлять всю пагинацию.
            // serializeQueryArgs: ({endpointName, queryArgs}) => `${endpointName}`,
            //Always merge incoming data to the cache entry
            // merge: (currentCache, newItems, args) => {
            //     // if (args.arg === 1) {
            //     //     currentCache.posts = [];
            //     //     currentCache.posts.push(...newItems.posts);
            //     // }
            //     currentCache.posts.push(...newItems.posts);
            //     currentCache.isAll = newItems.isAll;
            // },
            ///Refetch when the page arg changes
            // forceRefetch({currentArg, previousArg}) {
            //     return currentArg !== previousArg;
            // },
            // transformResponse: (posts: IPost[], meta: FetchBaseQueryMeta | undefined, arg: number) => {
            //     let isAll = false;
            //     if (posts.length === 0) {
            //         isAll = true;
            //     }
            //     return {posts, isAll};
            // },
            // providesTags: (result, error, page) => [{type: 'Post', id: `Pat-List-${page}`}],
        }),
        toggleLike: builder.mutation<{likesCount: number}, number>({
            query(id) {
                return {
                    url: URL_LIKEPOST(id),
                    method: 'POST',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(postLiked({id: args, likesCount: data.likesCount}));
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
        getTags: builder.query<ITagNormolaized[], string>({
            query(title) {
                const withTitle = title ? `?title=${title}` : '';
                return {
                    url: `${URL_TAGS}${withTitle}`,
                    credentials: 'include',
                };
            },
            transformResponse: (tags: ITag[]) => {
                const tagsNormolaized = tags.map((tag) => ({value: tag.title, label: `#${tag.title}`, id: tag.id}));
                return tagsNormolaized;
            },
        }),
        createPost: builder.mutation<IPost, TCreateInput>({
            query(data) {
                const dataSent = {tags: data.tags, title: data.title, text: data.text};
                return {
                    url: URL_POST,
                    method: 'POST',
                    credentials: 'include',
                    body: dataSent,
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        const {id} = data;
                        if (args.img) {
                            await dispatch(postApi.endpoints.createImgPost.initiate({id, img: args.img}));
                        } else {
                            dispatch(setPosts([data], true));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
        createImgPost: builder.mutation<IPost, {id: number; img: FormData}>({
            query(data) {
                const {id, img} = data;
                return {
                    url: `${URL_POST_IMG}/${id}`,
                    method: 'POST',
                    credentials: 'include',
                    body: img,
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(setPosts([data], true));
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
    }),
});
export const {useGetMyPostsQuery, useToggleLikeMutation, useLazyGetTagsQuery, useCreatePostMutation} = postApi;
