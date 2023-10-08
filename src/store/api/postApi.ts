import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL_BASE, URL_POST, URL_TAGS} from '../../constants/api';
import coockiesService from '../../service/coockies.service';
import transformDataPosts from '../../service/transformDataPosts.service';
import {ICreateComment} from '../../shared/Forms/CommentForm/CommentForm';
import {TCreateInput} from '../../shared/Forms/CreatePostForm/CreatePostFrorm';
import {TEditInput} from '../../shared/Forms/EditPostForm/EditPostForm';
import {normalizationTags} from '../../utils/tagsNormalization';
import {editPost, postDelite, postLiked, setLastLikedPost} from '../features/userSlice';
import {setPosts} from '../features/userSuncks';
import {IComment, IErrorResponse, IPost, IPostById, IPostTransform, IPostTransformById, ITag, ITagNormolaized} from './types';

export const enum ETypeForm {
    CREATE = 'create',
    EDIT = 'edit',
}

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
        getPosts: builder.query<IPostTransform[], {page: number; userId?: number; tags?: string}>({
            query({page, userId, tags}) {
                const getParams = () => {
                    const baseQuery = `?page=${page}&pageSize=5`;
                    if (tags) {
                        return `${baseQuery}&tags=${tags}`;
                    }
                    if (userId) {
                        return `${baseQuery}&userId=${userId}`;
                    }
                    return baseQuery;
                };

                return {
                    url: `${URL_POST.DEFUALT}${getParams()}`,
                    credentials: 'include',
                };
            },
            transformResponse: async (posts: IPost[]) => {
                const postsTransformed: IPostTransform[] = await transformDataPosts().getTransformDataPosts(posts);
                return postsTransformed;
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
        }),
        getMyPosts: builder.query<IPost[], {page: number; postPinId: number | undefined | null}>({
            query({page}) {
                return {
                    url: `${URL_POST.MY_POSTS}?page=${page}&pageSize=5`,
                    credentials: 'include',
                };
            },
            transformResponse: (posts: IPost[], meta, arg) => posts.filter((post) => post.id !== arg.postPinId),
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
        getPostById: builder.query<IPostTransformById, number>({
            query(id) {
                return {
                    url: `${URL_POST.DEFUALT}/${id}`,
                    credentials: 'include',
                };
            },
            transformResponse: async (post: IPostById) => {
                const postTransformed: IPostTransformById = await transformDataPosts().getTransformDataPostById(post);
                return postTransformed;
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            providesTags: ['Post'],
        }),
        createPost: builder.mutation<IPost, TCreateInput>({
            query(data) {
                const dataSent = {tags: data.tags, title: data.title, text: data.text};
                return {
                    url: URL_POST.DEFUALT,
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
                        if (args.img) {
                            await dispatch(postApi.endpoints.createImgPost.initiate({post: data, img: args.img, type: ETypeForm.CREATE}));
                        } else {
                            dispatch(setPosts([data], true));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
        editPost: builder.mutation<IPost, TEditInput>({
            query(data) {
                const dataSent = {tags: data.tags, title: data.title, text: data.text};
                return {
                    url: `${URL_POST.DEFUALT}/${data.id}`,
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
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        if (args.img) {
                            await dispatch(postApi.endpoints.createImgPost.initiate({post: data, img: args.img, type: ETypeForm.EDIT}));
                        } else {
                            const postTransformed: IPostTransform[] = await transformDataPosts().getTransformDataPosts([data]);
                            dispatch(editPost(postTransformed[0]));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
        createImgPost: builder.mutation<IPost, {post: IPost; img: FormData; type: ETypeForm}>({
            query(data) {
                const {post, img} = data;
                return {
                    url: `${URL_POST.POST_IMGT}/${post.id}`,
                    method: 'POST',
                    credentials: 'include',
                    body: img,
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        if (args.type === ETypeForm.CREATE) {
                            dispatch(setPosts([data], true));
                        } else {
                            const postTransformed: IPostTransform[] = await transformDataPosts().getTransformDataPosts([data]);
                            dispatch(editPost(postTransformed[0]));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        }),
        deletePost: builder.mutation<null, number>({
            query(id) {
                return {
                    url: `${URL_POST.DEFUALT}/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(postDelite(args));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        toggleLike: builder.mutation<{likesCount: number}, {postId: number; isLiked: boolean}>({
            query({postId}) {
                return {
                    url: URL_POST.LIKEPOST(postId),
                    method: 'POST',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                if (args) {
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(postLiked({id: args.postId, likesCount: data.likesCount}));
                        dispatch(setLastLikedPost({id: args.postId, isLiked: args.isLiked}));
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
                const tagsNormolaized = normalizationTags(tags);
                return tagsNormolaized;
            },
        }),
        createComment: builder.mutation<IComment, {data: ICreateComment; postId: number}>({
            query({postId, data}) {
                return {
                    url: URL_POST.COMMENT_CREATE(postId),
                    method: 'POST',
                    credentials: 'include',
                    body: data,
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            invalidatesTags: ['Post'],
        }),
        deleteComment: builder.mutation<IComment, {postId: number; commentId: number}>({
            query({postId, commentId}) {
                return {
                    url: URL_POST.COMMENT_DELITE(postId, commentId),
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            transformErrorResponse: (response) => {
                const data = response.data as IErrorResponse;
                return data;
            },
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetMyPostsQuery,
    useToggleLikeMutation,
    useLazyGetTagsQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetPostByIdQuery,
    useLazyGetPostByIdQuery,
    useEditPostMutation,
    useCreateCommentMutation,
    useDeleteCommentMutation,
} = postApi;
