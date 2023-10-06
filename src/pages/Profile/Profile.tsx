import React from 'react';
import {toast} from 'react-toastify';
import useScrollFetchngPost from '../../hooks/useScrollFetcingPost';
import {logOut, getUrlAvatar, getMe} from '../../store/features/userSuncks';
import {useAppDispatch, useAppSelector} from '../../store/store';
import Button from '../../ui/Button';
import InformationUser from '../../ui/InformationUser';
import {IInformationBlock, IItem} from '../../ui/types/types';
import useCreatePost from './hooks/useCreatePost';
import useDeliteProfile from './hooks/useDeliteProfile';
import useEditPost from './hooks/useEditPost';
import useEditProfile from './hooks/useEditProfile';
import useShowPostById from './hooks/useShowPostById';
import './Profile';

export default function Profile() {
    const me = useAppSelector(getMe());
    const {urlAvatar, loading: isLoadingAvatar} = useAppSelector(getUrlAvatar());

    const dispatch = useAppDispatch();

    /* Delite Profile*/
    const {getProfileDeliteModal, toggleModalDelite} = useDeliteProfile();

    /* Edit Profile */
    const {toggleEditProffile, getProfileEditModal} = useEditProfile();

    /* Create Post */
    const {toggleCreatePost, getCreatePostModal} = useCreatePost();

    /* Edit Post */
    const {handleEditPost, getEditPostModal} = useEditPost();

    /* Show Post By Id */
    const {getPostByIdModal, handlePostIdShow} = useShowPostById();

    /* Get PostList with LazyScroll*/
    const {getPosts, userPosts: posts} = useScrollFetchngPost(me, handleEditPost, handlePostIdShow);

    /* ---------------- */
    const handleLogOut = () => {
        try {
            dispatch(logOut());
        } catch (error) {
            toast('Что то пошло ни так', {type: 'error'});
            console.log(error);
        }
    };

    const itemsMenu: IItem[] = [
        {text: 'Редактировать профиль', addClass: '', action: toggleEditProffile},
        {text: 'Выйти из профиля', addClass: '', action: handleLogOut},
        {text: 'Удалить профиль', addClass: 'red', action: toggleModalDelite},
    ];

    const getInformationBlock = () => {
        if (me) {
            const {firstName, lastName, nickname} = me;
            return {firstName, lastName, nickname};
        }
        return undefined;
    };

    return (
        <>
            {me && (
                <section className="Profile">
                    <div className="Profile__container">
                        <h1 className="Profile__mainTitle">Мой профиль</h1>

                        <div className="Profile__informationUser">
                            <InformationUser
                                urlAvatar={urlAvatar}
                                informationBlock={getInformationBlock() as IInformationBlock}
                                items={itemsMenu}
                                discription={me.description}
                                isLoadingAvatar={isLoadingAvatar}
                            >
                                <div className="Profile__childInformationUser">
                                    <Button
                                        label="Мои подписки"
                                        className="Button__main_empty Button__main_empty_medium"
                                    />
                                    <Button
                                        label="Создать пост"
                                        className="Button__main_medium"
                                        onClick={toggleCreatePost}
                                    />
                                </div>
                            </InformationUser>
                        </div>

                        {posts?.length ? <h3 className="Profile__subTitle">Мои посты:</h3> : <></>}
                        <div className="Profile__posts">{getPosts()}</div>
                    </div>
                </section>
            )}

            <>{getEditPostModal()}</>
            <>{getCreatePostModal()}</>
            <>{getProfileDeliteModal()}</>
            <>{getProfileEditModal()}</>
            <>{getPostByIdModal()}</>
        </>
    );
}
