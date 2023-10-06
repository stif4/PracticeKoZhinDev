import React from 'react';
import {Link} from 'react-router-dom';
import useFetchUserWithAwatar from '../../hooks/useFetchUserWithAwatar';
import {IUser} from '../../store/api/types';
import Avatar from '../Avatar';
import Card from '../Card';
import useSubscribeUser from './hooks/useSubscribeUser';
import './SubscribeUser.scss';

interface ISubscribeUserProps {
    userId: number;
    userFully?: IUser;
    onUserIdShow?: (userId: number) => void;
}

const PATH_ICON_SUBSCRIBE = '../icons/adduser.svg';
const PATH_ICON_SUBSCRIBED = '../icons/bigCheckBox.svg';

export default function SubscribeUser({userId, userFully, onUserIdShow}: ISubscribeUserProps) {
    const {user, avatar, isLoadingAvatar, isFetchingUser, isMe, me} = useFetchUserWithAwatar(userId, userFully);
    const {isSubscribed, toggleSubscribeUser} = useSubscribeUser(me, user);

    const handleKeyPress = () => {};

    const getImg = () => {
        if (user) {
            if (isMe || me === null) {
                return <></>;
            }
            const pathImg = isSubscribed ? PATH_ICON_SUBSCRIBED : PATH_ICON_SUBSCRIBE;
            return (
                <img
                    src={pathImg}
                    alt="subscribe"
                    className="subscribeUser__img"
                />
            );
        }
        return <></>;
    };

    const getInformationBlock = () => {
        if (user) {
            const {firstName, lastName, nickname} = user;
            return {firstName, lastName, nickname};
        }
        return undefined;
    };

    return (
        <div className="subscribeUser">
            <Card>
                <div className="subscribeUser__container">
                    <Link
                        className="subscribeUser__showById"
                        to={`/user/${userId}`}
                        preventScrollReset
                    >
                        <Avatar
                            informationBlock={getInformationBlock()}
                            urlImg={avatar}
                            isLoading={isLoadingAvatar}
                            withInformationBlock
                            size={50}
                        />
                    </Link>
                    <div
                        className="subscribeUser__containerImg"
                        onClick={toggleSubscribeUser}
                        onKeyPress={handleKeyPress}
                        tabIndex={0}
                        role="button"
                    >
                        {getImg()}
                    </div>
                </div>
            </Card>
        </div>
    );
}
