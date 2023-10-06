import React from 'react';
import {IUser} from '../../store/api/types';
import SubscribeUser from './SubscribeUser';
import './SubscribeUserList.scss';

interface ISubscribeUserListProps {
    users: IUser[];
    onUserIdShow?: (userId: number) => void;
}

export default function SubscribeUserList({users, onUserIdShow}: ISubscribeUserListProps) {
    return (
        <div className="subscribeUserList">
            <div className="subscribeUserList__container">
                {users.map((user) => (
                    <SubscribeUser
                        key={user.id}
                        userId={user.id}
                        userFully={user}
                        onUserIdShow={onUserIdShow}
                    />
                ))}
            </div>
        </div>
    );
}
