import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EPositionLoading, IPost, IPostTransform, IPostTransformById, IUser} from '../api/types';

interface IURLAvatar {
    urlAvatar: string | undefined;
    loading: boolean;
}

interface IUserPosts {
    userPosts: IPostTransform[] | null;
    lodaing: {isLoading: boolean; postion: EPositionLoading};
    isAll: boolean;
}

interface IPostsPayloadAction {
    posts: IPostTransform[];
    isCreated?: boolean;
}
interface IIsEditPost {
    id: number | null;
    isLoading: boolean;
}
interface IUserState {
    user: IUser | null;
    avatar: IURLAvatar;
    userPosts: IUserPosts;
    isEditPost: IIsEditPost;
}

const initialState: IUserState = {
    user: null,
    avatar: {urlAvatar: undefined, loading: false},
    isEditPost: {id: null, isLoading: false},
    userPosts: {userPosts: null, lodaing: {isLoading: false, postion: EPositionLoading.DOWN}, isAll: false},
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            // const newUser = {...action.payload, subscriptions: [...action.payload.subscriptions]};
            state.user = action.payload;
        },

        pendingAvatar: (state) => {
            state.avatar.loading = true;
        },
        fulfilledAvatar: (state, action: PayloadAction<string>) => {
            state.avatar.urlAvatar = action.payload;
            state.avatar.loading = false;
        },
        failedAvatar: (state) => {
            state.avatar.loading = false;
        },

        pendingPosts: (state, action: PayloadAction<boolean | undefined>) => {
            state.userPosts.lodaing.isLoading = true;
            state.userPosts.lodaing.postion = action.payload ? EPositionLoading.UP : EPositionLoading.DOWN;
        },
        fulfilledPosts: (state, action: PayloadAction<IPostsPayloadAction>) => {
            if (state.userPosts.userPosts !== null) {
                if (action.payload.isCreated) {
                    state.userPosts.userPosts = [...action.payload.posts, ...state.userPosts.userPosts];
                } else {
                    state.userPosts.userPosts = [...state.userPosts.userPosts, ...action.payload.posts];
                }
                state.userPosts.lodaing.isLoading = false;
            } else {
                state.userPosts.userPosts = [...action.payload.posts];
                state.userPosts.lodaing.isLoading = false;
            }
            if (!action.payload.posts.length) {
                state.userPosts.isAll = true;
            }
        },
        failedPosts: (state) => {
            state.userPosts.lodaing.isLoading = false;
        },

        editPost: (state, action: PayloadAction<IPostTransform>) => {
            state.userPosts.userPosts = state.userPosts.userPosts && state.userPosts.userPosts.map((post) => {
                if (post.id === action.payload.id) {
                    return action.payload;
                }
                return post;
            });
            state.isEditPost.isLoading = false;
        },
        pendingEditPost: (state, action:PayloadAction<number>) => {
            state.isEditPost.id = action.payload;
            state.isEditPost.isLoading = true;
        },
        failedEditPost: (state) => {
            state.isEditPost.isLoading = false;
        },

        resetMyPosts: (state) => {
            state.userPosts.userPosts = null;
            state.userPosts.isAll = false;
        },
        setPinPost: (state, action: PayloadAction<IPostTransformById>) => {
            if (state.userPosts.userPosts) {
                state.userPosts.userPosts = [action.payload, ...state.userPosts.userPosts];
            } else {
                state.userPosts.userPosts = [action.payload];
            }
        },
        postLiked: (state, action: PayloadAction<{id: number; likesCount: number}>) => {
            state.userPosts.userPosts = state.userPosts.userPosts && state.userPosts.userPosts?.map((post) => {
                if (post.id === action.payload.id) {
                    return {...post, likesCount: action.payload.likesCount, isLiked: !post.isLiked};
                }
                return post;
            });
        },
        postDelite: (state, action: PayloadAction<number>) => {
            state.userPosts.userPosts = state.userPosts.userPosts && state.userPosts.userPosts?.filter((post) => post.id !== action.payload);
        },
    },
});

export default userSlice.reducer;
export const {
    logout,
    setUser,
    pendingAvatar,
    fulfilledAvatar,
    failedAvatar,
    pendingPosts,
    fulfilledPosts,
    failedPosts,
    postLiked,
    resetMyPosts,
    postDelite,
    setPinPost,
    editPost,
    failedEditPost,
    pendingEditPost,
} = userSlice.actions;
