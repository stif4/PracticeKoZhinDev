import React from 'react';
import {toast} from 'react-toastify';
import {IUser, IUserById} from '../../../store/api/types';
import {useDeliteSubscribeMutation, useSubscribeMutation} from '../../../store/api/userApi';
import checkSubscriptions from '../../../utils/checkSubscriptions';

export default function useSubscribeUser(me: IUserById | null, user: IUser | null | undefined) {
    const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false);
    const [subscribe, {isError: isErrorSubscribe, isSuccess: isSuccessSubscribe}] = useSubscribeMutation();
    const [deliteSubscribe, {isError: isErrorDeliteSubscribe, isSuccess: isSuccessDeliteSubscribe}] = useDeliteSubscribeMutation();

    const toggleSubscribeUser = () => {
        if (isSubscribed && user) {
            return deliteSubscribe(user.id);
        }
        if (!isSubscribed && user) {
            return subscribe(user.id);
        }
        return undefined;
    };

    React.useEffect(() => {
        if (user && me) {
            const isSub = checkSubscriptions(me, user);
            setIsSubscribed(isSub);
        }
    }, [user, me]);

    React.useEffect(() => {
        if (isSuccessSubscribe) {
            toast('Подписка оформлена', {type: 'success'});
        }
    }, [isSuccessSubscribe]);

    React.useEffect(() => {
        if (isSuccessDeliteSubscribe) {
            toast('Подписка отменена', {type: 'success'});
        }
    }, [isSuccessDeliteSubscribe]);

    React.useEffect(() => {
        if (isErrorDeliteSubscribe || isErrorSubscribe) {
            toast('Что то не так!', {type: 'error'});
        }
    }, [isErrorDeliteSubscribe, isErrorSubscribe]);

    return {toggleSubscribeUser, isSubscribed};
}
