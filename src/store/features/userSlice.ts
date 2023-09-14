import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import coockiesService from '../../service/coockies.service';
import {IUser} from '../api/types';
import {AppDispatch, RootState} from '../store';
import {userApi} from '../api/userApi';
import fetchService from '../../service/fetch.service';

interface IURLAvatar {
    urlAvatar: string | undefined;
    loading: boolean;
}

interface IUserState {
    user: IUser | null;
    avatar: IURLAvatar;
}

const initialState: IUserState = {
    user: null,
    avatar: {urlAvatar: undefined, loading: false},
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
    },
});

export default userSlice.reducer;
export const {logout, setUser, pendingAvatar, fulfilledAvatar, failedAvatar} = userSlice.actions;

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

export const getMe = () => (state: RootState) => state.userState.user;
export const getUrlAvatar = () => (state: RootState) => state.userState.avatar;
