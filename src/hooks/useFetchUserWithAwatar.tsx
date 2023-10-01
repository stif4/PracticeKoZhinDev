import React from 'react';
import {toast} from 'react-toastify';
import fetchService from '../service/fetch.service';
import {IUser} from '../store/api/types';
import {useGetUserQuery} from '../store/api/userApi';
import {getMe, getUrlAvatar} from '../store/features/userSuncks';
import {useAppSelector} from '../store/store';

export default function useFetchUserWithAwatar(userId: number) {
    const me = useAppSelector(getMe()) as IUser;

    const meAvatar = useAppSelector(getUrlAvatar());
    const isMe = me.id === userId;

    const {
        data: user,
        isLoading: isLoadingUser,
        isFetching: isFetchingUser,
        isError: isErrorUser,
        isSuccess: isSuccessUser,
    } = useGetUserQuery({id: userId}, {skip: isMe});

    const [avatar, setAvatar] = React.useState<string | undefined>(isMe ? meAvatar.urlAvatar : undefined);
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
        if (isErrorUser) {
            toast('Что то не так', {type: 'error'});
        }
    }, [isErrorUser]);

    return {isLoadingAvatar, avatar, user: isMe ? me : user, isFetchingUser, isMe, me};
}
