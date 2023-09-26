import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EPositionLoading, IPostTransform, IUser} from '../api/types';

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

interface IUserState {
    user: IUser | null;
    avatar: IURLAvatar;
    userPosts: IUserPosts;
}

const initialState: IUserState = {
    user: null,
    avatar: {urlAvatar: undefined, loading: false},
    userPosts: {userPosts: null, lodaing: {isLoading: false, postion: EPositionLoading.DOWN}, isAll: false},
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
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

        postLiked: (state, action: PayloadAction<{id: number; likesCount: number}>) => {
            state.userPosts.userPosts = state.userPosts.userPosts && state.userPosts.userPosts?.map((post) => {
                if (post.id === action.payload.id) {
                    return {...post, likesCount: action.payload.likesCount, isLiked: !post.isLiked};
                }
                return post;
            });
        },
    },
});

export default userSlice.reducer;
export const {logout,
    setUser,
    pendingAvatar,
    fulfilledAvatar,
    failedAvatar,
    pendingPosts,
    fulfilledPosts,
    failedPosts,
    postLiked} = userSlice.actions;
