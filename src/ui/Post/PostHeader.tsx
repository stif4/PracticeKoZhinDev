import React from 'react';
import {toast} from 'react-toastify';
import {useDeletePostMutation} from '../../store/api/postApi';
import {IPostTransform} from '../../store/api/types';
import {usePinPostMutation, useUnpinPostMutation} from '../../store/api/userApi';
import {IInformationBlock, IItem} from '../types/types';
import useFetchUserWithAwatar from '../../hooks/useFetchUserWithAwatar';
import Avatar from '../Avatar';
import PopUp from '../Pop-up';

interface PostHeaderProps {
    informationBlock?: IInformationBlock;
    postTransformed: IPostTransform;
    onEditPost?: (post: IPostTransform) => void;
}

export default function PostHeader({postTransformed, informationBlock, onEditPost}: PostHeaderProps) {
    const [deletePost, {isError: isErrorDelete, isSuccess: isSuccessDelete}] = useDeletePostMutation();
    const [pinPost, {isError: isErrorPinPost, isSuccess: isSuccessPinPost}] = usePinPostMutation();
    const [unpinPost, {isError: isErrorUnPinPost, isSuccess: isSuccessUnPinPost}] = useUnpinPostMutation();

    const {
        isLoadingAvatar,
        avatar,
        isMe: isMyPost,
        me,
    } = useFetchUserWithAwatar(postTransformed.creatorId, postTransformed.creator);

    const isPinPost = Boolean(me && postTransformed.id === me.pinnedPostId);

    const handleDelete = () => {
        if (isMyPost) {
            deletePost(postTransformed.id);
        }
    };

    const handleUnPinPost = () => {
        unpinPost(null);
    };

    const handlePinPost = () => {
        pinPost(postTransformed.id);
    };

    React.useEffect(() => {
        if (isErrorDelete || isErrorPinPost || isErrorUnPinPost) {
            toast('Что то пошло ни так', {type: 'error'});
        }
    }, [isErrorDelete || isErrorPinPost || isErrorUnPinPost]);

    React.useEffect(() => {
        if (isSuccessDelete || isSuccessUnPinPost || isSuccessPinPost) {
            const word = isSuccessDelete ? 'удален' : isSuccessUnPinPost ? 'откреплен' : isSuccessPinPost ? 'закреплен' : '';
            toast(`Пост успешно ${word}`, {type: 'success'});
        }
    }, [isSuccessDelete || isSuccessUnPinPost || isSuccessPinPost]);

    const handleEdit = () => {
        if (onEditPost) {
            onEditPost(postTransformed);
        }
    };

    const getItemsPopUp = () => {
        const items: IItem[] = [
            {text: isPinPost ? 'Открепить пост' : 'Закрепить пост', addClass: '', action: isPinPost ? handleUnPinPost : handlePinPost},
        ];
        if (isMyPost) {
            items.push({text: 'Редактировать пост', addClass: '', action: handleEdit});
            items.push({text: 'Удалить пост', addClass: 'red', action: handleDelete});
        }
        return items;
    };

    return (
        <div className="Post__header">
            <Avatar
                informationBlock={informationBlock}
                urlImg={avatar}
                isLoading={isLoadingAvatar}
                withInformationBlock
                size={50}
            />
            <div className="Post__menu">
                {isPinPost && (
                    <figure className="Post__attacher">
                        <img
                            className="Post__imgAttacher"
                            src="../icons/pin.svg"
                            alt="attach"
                        />
                    </figure>
                )}
                <div className="Post__popUp">
                    <PopUp items={getItemsPopUp()} />
                </div>
            </div>
        </div>
    );
}
