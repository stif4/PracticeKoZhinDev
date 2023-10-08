import coockiesService from '../../service/coockies.service';
import fetchService from '../../service/fetch.service';
import transformDataPosts from '../../service/transformDataPosts.service';
import {IPost, IUserById} from '../api/types';
import {userApi} from '../api/userApi';
import {AppDispatch, RootState} from '../store';
import {failedAvatar, failedPosts, fulfilledAvatar, fulfilledPosts, logout, pendingAvatar, pendingPosts} from './userSlice';

///// actions /////
export const logOut = () => async (dispatch: AppDispatch) => {
    try {
        coockiesService().removeTookens();
        await dispatch(logout());
        // вычищает кеш с юзером
        await dispatch(userApi.util.resetApiState());
    } catch (error) {
        console.log(error);
    }
};

export const setPosts = (posts: IPost[], isCreated?: boolean) => async (dispatch: AppDispatch, getState: () => RootState) => {
    let post: IPost[] = [];
    if (isCreated) {
        const user = getState().userState.user as IUserById;
        post = [
            {
                ...posts[0],
                creator: {
                    id: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    nickname: user?.nickname,
                    phone: user?.phone,
                    email: user?.email,
                    updateTime: user?.updateTime,
                    createTime: user?.createTime,
                    avatarId: user?.avatarId,
                    pinnedPostId: user?.pinnedPostId,
                    description: user?.description,
                },
                isLiked: false,
                likesCount: 0,
            },
        ];
    }

    dispatch(pendingPosts(isCreated));
    try {
        const postsTransformed = await transformDataPosts().getTransformDataPosts(isCreated ? post : posts);
        dispatch(fulfilledPosts({posts: postsTransformed, isCreated}));
    } catch (error) {
        console.log(error);
        dispatch(failedPosts());
    }
};

export const parseAvatar = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(pendingAvatar());
    try {
        const avatar = await fetchService().fetchFile(id);
        dispatch(fulfilledAvatar(avatar));
    } catch (error) {
        dispatch(failedAvatar());
        console.log(error);
    }
};

///// selectors /////
export const getMe = () => (state: RootState) => state.userState.user;
export const getUrlAvatar = () => (state: RootState) => state.userState.avatar;
export const getMyPosts = () => (state: RootState) => state.userState.userPosts;
export const getIsEditPost = () => (state: RootState) => state.userState.isEditPost;
export const getLastLikedPost = () => (state: RootState) => state.userState.lastLikedPost;
