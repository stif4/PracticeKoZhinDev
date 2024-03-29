import React from 'react';
import coockiesService from '../service/coockies.service';
import {useRefreshMutation} from '../store/api/authApi';
import {getUrlAvatar, getMe, parseAvatar} from '../store/features/userSuncks';
import {useAppDispatch, useAppSelector} from '../store/store';
import Loader from '../ui/Loader';

interface IAppLoader {
    children: React.ReactNode;
}

function AppLoader({children}: IAppLoader) {
    const [refresh, {isLoading}] = useRefreshMutation();
    const me = useAppSelector(getMe());
    const [currentUrlAvatarId, setCurrentUrlAvatarId] = React.useState<number | undefined>();
    const {urlAvatar, loading} = useAppSelector(getUrlAvatar());
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (coockiesService().getRefreshtoken()) {
            refresh(true);
        }
        if (me && me.avatarId) {
            setCurrentUrlAvatarId(me.avatarId);
        }
    }, []);

    React.useEffect(() => {
        if (me && me.avatarId) {
            const isEmptyStateUrlAvatar = Boolean(me.avatarId && !urlAvatar);
            const isChangedAvatarId = Boolean(me.avatarId && me.avatarId !== currentUrlAvatarId);

            if (isEmptyStateUrlAvatar || isChangedAvatarId) {
                setCurrentUrlAvatarId(me.avatarId);
                try {
                    dispatch(parseAvatar(me.avatarId));
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }, [me?.avatarId]);

    if (isLoading || (coockiesService().getRefreshtoken() && !me)) {
        return <Loader />;
    }

    return <>{children}</>;
}
export default AppLoader;
