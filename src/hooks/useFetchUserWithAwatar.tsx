import React from 'react';
import {toast} from 'react-toastify';
import fetchService from '../service/fetch.service';
import {IUser} from '../store/api/types';
import {useGetUserQuery} from '../store/api/userApi';
import {getMe, getUrlAvatar} from '../store/features/userSuncks';
import {useAppSelector} from '../store/store';

export default function useFetchUserWithAwatar(userId: number, userFully?: IUser) {
    const me = useAppSelector(getMe());

    const meAvatar = useAppSelector(getUrlAvatar());
    const isMe = me ? me.id === userId : false;
    const isUserFully = Boolean(userFully);
    const skipToken = isUserFully || isMe;

    const {
        data: user,
        isLoading: isLoadingUser,
        isFetching: isFetchingUser,
        isError: isErrorUser,
        error: errorUser,
        isSuccess: isSuccessUser,
    } = useGetUserQuery({id: userId}, {skip: skipToken});

    const [avatar, setAvatar] = React.useState<string | undefined>(undefined);
    const [isLoadingAvatar, setIsLoadingAvatar] = React.useState<boolean>(false);

    const fetchAvatarCreator = async (id: number) => {
        const urlAvatart = await fetchService().fetchFile(id);
        setAvatar(urlAvatart);
        setIsLoadingAvatar(false);
    };

    React.useEffect(() => {
        if (user && user.avatarId) {
            setIsLoadingAvatar(true);
            fetchAvatarCreator(user.avatarId);
        }
    }, [user]);

    React.useEffect(() => {
        if (!isMe && userFully && userFully.avatarId) {
            setIsLoadingAvatar(true);
            fetchAvatarCreator(userFully?.avatarId);
        }
    }, []);

    React.useEffect(() => {
        if (isErrorUser) {
            toast('Что то не так', {type: 'error'});
        }
    }, [isErrorUser]);

    const getUser = () => {
        if (isMe) {
            return me;
        }
        if (userFully) {
            return userFully;
        }
        return user;
    };

    return {
        isLoadingAvatar: isMe ? meAvatar.loading : isLoadingAvatar,
        avatar: isMe ? meAvatar.urlAvatar : avatar,
        isErrorUser,
        errorUser,
        user: getUser(),
        isFetchingUser,
        isMe,
        me,
    };
}
