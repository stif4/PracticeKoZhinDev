import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import coockiesService from '../../service/coockies.service';
import {IUser} from '../api/types';
import {AppDispatch, RootState} from '../store';
import {userApi} from '../api/userApi';

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;
export const {logout, setUser} = userSlice.actions;

export const logOut = () => async (dispatch: AppDispatch) => {
    coockiesService().removeTookens();
    await dispatch(logout());
    // вычищает кеш с юзером
    await dispatch(userApi.util.resetApiState());
};

export const getMe = () => (state: RootState) => state.userState.user;
