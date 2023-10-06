import React from 'react';
import SubscribeUserList from '../../ui/SubscribeUser/SubscribeUserList';
import useLazyScrollUsers from './hooks/useLazyScrollUsers';
import SubscriptionsUserSkeleton from './SubscriptionsUserSkeleton';
import './SubscriptionsPage.scss';

export default function SubscriptionsPage() {
    const {users, isLoading, getInputSeartch} = useLazyScrollUsers();

    const getUsers = () => {
        if (users?.length) {
            return (
                <SubscribeUserList
                    users={users}
                />
            );
        }

        if (isLoading && users === null) {
            const array = [...new Array(8)];
            return (
                <>
                    {array.map((element, indexElement) => (
                        <SubscriptionsUserSkeleton key={indexElement} />
                    ))}
                </>
            );
        }
        return <></>;
    };

    return (
        <>
            <div className="subscriptionsPage">
                <div className="subscriptionsPage__container">
                    <div className="subscriptionsPage__titleContainer">
                        <h1 className="subscriptionsPage__title">Подписки</h1>
                    </div>
                    <div className="subscriptionsPage__seartch">{getInputSeartch()}</div>
                    <div className="subscriptionsPage__users">{getUsers()}</div>
                </div>
            </div>
        </>
    );
}
