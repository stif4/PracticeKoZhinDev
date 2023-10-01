import React from 'react';
import useFetchUserWithAwatar from '../../hooks/useFetchUserWithAwatar';
import checkSubscriptions from '../../utils/checkSubscriptions';
import Avatar from '../Avatar';
import Card from '../Card';
import './SubscribeUser.scss';

interface ISubscribeUserProps {
    userId: number;
}

const PATH_ICON_SUBSCRIBE = '../icons/adduser.svg';
const PATH_ICON_SUBSCRIBED = '../icons/bigCheckBox.svg';

export default function SubscribeUser({userId}: ISubscribeUserProps) {
    /// доделать скелетон к форме
    const {user, avatar, isLoadingAvatar, isFetchingUser, isMe, me} = useFetchUserWithAwatar(userId);

    const getInformationBlock = () => {
        if (user) {
            const {firstName, lastName, nickname} = user;
            return {firstName, lastName, nickname};
        }
        return undefined;
    };

    const getImg = () => {
        if (user) {
            if (isMe) {
                return <></>;
            }

            const pathImg = checkSubscriptions(me, user) ? PATH_ICON_SUBSCRIBED : PATH_ICON_SUBSCRIBE;

            return (
                <img
                    src={pathImg}
                    alt="subscribe"
                    className="SubscribeUser__img"
                />
            );
        }
        return <></>;
    };

    return (
        <div className="SubscribeUser">
            <Card>
                <div className="SubscribeUser__container">
                    <Avatar
                        informationBlock={getInformationBlock()}
                        urlImg={avatar}
                        isLoading={isLoadingAvatar}
                        withInformationBlock
                        size={50}
                    />
                    <div className="SubscribeUser__containerImg">{getImg()}</div>
                </div>
            </Card>
        </div>
    );
}
