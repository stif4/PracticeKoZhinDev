import React from 'react';
import coockiesService from '../service/coockies.service';
import {useRefreshMutation} from '../store/api/authApi';

interface IAppLoader {
    children: React.ReactNode;
}

function AppLoader({children}: IAppLoader) {
    const [refresh, {isLoading}] = useRefreshMutation();

    React.useEffect(() => {
        if (coockiesService().getRefreshtoken()) {
            refresh(true);
        }
    }, []);

    if (isLoading) {
        return <div>...Loading</div>;
    }

    return <>{children}</>;
}
export default AppLoader;
