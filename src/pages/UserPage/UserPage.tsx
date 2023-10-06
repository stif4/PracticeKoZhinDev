import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useFetchUserWithAwatar from '../../hooks/useFetchUserWithAwatar';
import Button from '../../ui/Button';
import InformationUser from '../../ui/InformationUser';
import PostList from '../../ui/Post';
import PostSkeleton from '../../ui/Post/PostSkeleton';
import {IInformationBlock} from '../../ui/types/types';
import useLazyScrollPosts from './hooks/useLazyScrollPosts';
import useSubscribeUser from '../../ui/SubscribeUser/hooks/useSubscribeUser';
import useShowPostById from '../Profile/hooks/useShowPostById';
import BackButton from '../../ui/Button/BackButton/BackButton';
import {IErrorResponse} from '../../store/api/types';
import ErrorPage from '../ErrorPage';
import './UserPage.scss';

interface IUserPageProps {
    userIdFromModal?: number;
}

const CLASS_BUTTON_SUBSCRIBE = 'Button__main_medium ';
const CLASS_BUTTON_UNSUBSCRIBE = 'Button__main_empty Button__main_empty_medium';

export default function UserPage({userIdFromModal}: IUserPageProps) {
    const navigate = useNavigate();
    const {id: userIdFromUrl} = useParams();

    const getQuery = () => {
        if (userIdFromModal) {
            return userIdFromModal;
        }
        return Number(userIdFromUrl);
    };

    const {getPostByIdModal, handlePostIdShow} = useShowPostById();

    const {isLoadingAvatar, avatar, user, isFetchingUser, isMe, me, isErrorUser, errorUser} = useFetchUserWithAwatar(getQuery());

    const {posts, isLoading} = useLazyScrollPosts(getQuery());

    const {isSubscribed, toggleSubscribeUser} = useSubscribeUser(me, user);

    const getInformationBlock = () => {
        if (user) {
            const {firstName, lastName, nickname} = user;
            return {firstName, lastName, nickname};
        }
        return undefined;
    };

    const handleClickBB = () => {
        navigate(-1);
    };

    if (isMe) {
        navigate('/user');
    }

    if (isErrorUser) {
        const error = errorUser as IErrorResponse;
        if (error.statusCode === 400) {
            return <ErrorPage />;
        }
    }

    return (
        <>
            <section className="userPage">
                <div className="userPage__container">
                    <div className="userPage__backButton">
                        <BackButton onClick={handleClickBB} />
                    </div>
                    <div className="userPage__informationUser">
                        <InformationUser
                            urlAvatar={avatar}
                            informationBlock={getInformationBlock() as IInformationBlock}
                            discription={user ? user.description : null}
                            isLoadingAvatar={isLoadingAvatar}
                        >
                            <div className="userPage__childInformationUser">
                                <Button
                                    label={isSubscribed ? 'Отписаться' : 'Подписаться'}
                                    className={isSubscribed ? CLASS_BUTTON_UNSUBSCRIBE : CLASS_BUTTON_SUBSCRIBE}
                                    onClick={toggleSubscribeUser}
                                />
                            </div>
                        </InformationUser>
                    </div>

                    {posts?.length ? <h3 className="userPage__title">Посты:</h3> : <></>}
                    <div className="userPage__posts">
                        <PostList
                            posts={posts}
                            onPostIdShow={handlePostIdShow}
                            withInformationBlock
                        />
                        {isLoading && <PostSkeleton marginTop="16px" />}
                    </div>
                </div>
                <>{getPostByIdModal()}</>
            </section>
        </>
    );
}
