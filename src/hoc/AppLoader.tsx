import React from 'react';
import coockiesService from '../service/coockies.service';
import {useRefreshMutation} from '../store/api/authApi';
import {getUrlAvatar, getMe, parseAvatar} from '../store/features/userSlice';
import {useAppDispatch, useAppSelector} from '../store/store';

interface IAppLoader {
    children: React.ReactNode;
}

function AppLoader({children}: IAppLoader) {
    const [refresh, {isLoading}] = useRefreshMutation();
    const me = useAppSelector(getMe());
    const {urlAvatar, loading} = useAppSelector(getUrlAvatar());

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (coockiesService().getRefreshtoken()) {
            refresh(true);
        }
    }, []);

    React.useEffect(() => {
        if (me && !urlAvatar && me.avatarId) {
            dispatch(parseAvatar(me.avatarId));
        }
    }, [me?.avatarId]);

    if (isLoading) {
        return <div>...Loading</div>;
    }

    return <>{children}</>;
}
export default AppLoader;
