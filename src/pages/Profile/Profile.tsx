import React from 'react';
import {toast} from 'react-toastify';
import useScrollFetchngPost from '../../hooks/useScrollFetcingPost';
import {useDeleteUserMutation} from '../../store/api/userApi';
import {logOut, getUrlAvatar, getMe} from '../../store/features/userSuncks';
import {useAppDispatch, useAppSelector} from '../../store/store';
import Button from '../../ui/Button';
import InformationUser from '../../ui/InformationUser';
import {IInformationBlock, IItem} from '../../ui/types/types';
import ProfileModal from './modal/ProfileModal';
import ProfilePaperSlideCreatePost from './modal/ProfilePaperSlideCreatePost';
import ProfilePaperSlideEdit from './modal/ProfilePaperSlideEdit';
import './Profile';

export default function Profile() {
    const [isActivePaperSlideEdit, setIsActivePaperSlideEdit] = React.useState<boolean>(false);
    const [isActivePaperSlideCreatePost, setIsActivePaperSlideCreatePost] = React.useState<boolean>(false);
    const [isActiveModal, setActiveModal] = React.useState<boolean>(false);

    const me = useAppSelector(getMe());

    const {urlAvatar, loading: isLoadingAvatar} = useAppSelector(getUrlAvatar());

    const {getPosts, userPosts: posts} = useScrollFetchngPost();

    const [deleteUser] = useDeleteUserMutation();

    const dispatch = useAppDispatch();

    const toggleEditProffile = () => {
        setIsActivePaperSlideEdit((prev) => !prev);
    };

    const toggleCreatePost = () => {
        setIsActivePaperSlideCreatePost((prev) => !prev);
    };

    const toggleModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setActiveModal((prev) => !prev);
    };

    const handelDelete = async () => {
        try {
            await deleteUser(null);
            toast('Акаунт успешно удален', {type: 'success'});
        } catch (error) {
            toast('Что то пошло ни так', {type: 'error'});
            console.log(error);
        }
    };

    const handleLogOut = () => {
        try {
            dispatch(logOut());
        } catch (error) {
            toast('Что то пошло ни так', {type: 'error'});
            console.log(error);
        }
    };

    const ITEMS: IItem[] = [
        {text: 'Редактировать профиль', addClass: '', action: toggleEditProffile},
        {text: 'Выйти из профиля', addClass: '', action: handleLogOut},
        {text: 'Удалить профиль', addClass: 'red', action: toggleModal},
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
            <section className="Profile">
                <div className="Profile__container">
                    <h1 className="Profile__mainTitle">Мой профиль</h1>
                    {me && (
                        <div className="Profile__informationUser">
                            <InformationUser
                                urlAvatar={urlAvatar}
                                informationBlock={getInformationBlock() as IInformationBlock}
                                items={ITEMS}
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
                    )}
                    {posts?.length ? <h3 className="Profile__subTitle">Мои посты:</h3> : <></>}
                    <div className="Profile__posts">{getPosts()}</div>
                </div>
            </section>

            <ProfilePaperSlideEdit
                isActive={isActivePaperSlideEdit}
                toggleEditProffile={toggleEditProffile}
            />

            <ProfilePaperSlideCreatePost
                isActive={isActivePaperSlideCreatePost}
                toggleCreatePost={toggleCreatePost}
            />

            <ProfileModal
                onActive={toggleModal}
                isActive={isActiveModal}
                onDelite={handelDelete}
            />
        </>
    );
}
