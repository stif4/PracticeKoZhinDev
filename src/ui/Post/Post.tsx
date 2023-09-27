import React from 'react';
import {toast} from 'react-toastify';
import Avatar from '../Avatar';
import Card from '../Card';
import Like from '../Like';
import PopUp from '../Pop-up';
import TagList from '../Tag';
import {IPostTransform} from '../../store/api/types';
import {IInformationBlock, IItem} from '../types/types';
import {useAppSelector} from '../../store/store';
import {getIsEditPost, getMe} from '../../store/features/userSuncks';
import {useDeletePostMutation, useEditPostMutation} from '../../store/api/postApi';
import './Post.scss';
import {usePinPostMutation, useUnpinPostMutation} from '../../store/api/userApi';
import PostSkeleton from './PostSkeleton';

interface IPostProps {
    urlAvatar?: string;
    informationBlock?: IInformationBlock;
    postTransformed: IPostTransform;
    onEditPost?: (post: IPostTransform) => void;
}

export default function Post({urlAvatar, informationBlock, postTransformed, onEditPost}: IPostProps) {
    const [deletePost, {isError: isErrorDelete, isSuccess: isSuccessDelete}] = useDeletePostMutation();
    const [pinPost, {isError: isErrorPinPost, isSuccess: isSuccessPinPost}] = usePinPostMutation();
    const [unpinPost, {isError: isErrorUnPinPost, isSuccess: isSuccessUnPinPost}] = useUnpinPostMutation();

    const me = useAppSelector(getMe());
    const {isLoading: isLoadingEditPost, id: idEditPost} = useAppSelector(getIsEditPost());
    const isMyPost = Boolean(me && postTransformed.creatorId === me.id);
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

    const getPaddingCard = () => {
        if (!informationBlock) {
            return '0px 16px 16px 16px';
        }
        return undefined;
    };

    if (isLoadingEditPost) {
        if (idEditPost === postTransformed.id) {
            return <PostSkeleton marginBottom="16px" />;
        }
    }

    return (
        <div className="Post">
            <Card padding={getPaddingCard()}>
                <div className="Post__container">
                    {informationBlock && (
                        <div className="Post__header">
                            <Avatar
                                informationBlock={informationBlock}
                                urlImg={urlAvatar}
                                withInformationBlock
                                size={50}
                            />
                            <div className="Post__menu">
                                {isPinPost && (
                                    <figure className="Post__attacher">
                                        <img
                                            className="Post__imgAttacher"
                                            src="./icons/pin.svg"
                                            alt="attach"
                                        />
                                    </figure>
                                )}
                                <div className="Post__popUp">
                                    <PopUp items={getItemsPopUp()} />
                                </div>
                            </div>
                        </div>
                    )}

                    {postTransformed.imageUrl && (
                        <div className="Post__containerImg">
                            <img
                                className="Post__img"
                                src={postTransformed.imageUrl}
                                alt="postImg"
                            />
                        </div>
                    )}

                    <h2 className="Post__title">{postTransformed.title}</h2>
                    <p className="Post__text">{postTransformed.text}</p>

                    <div className="Post__tegs">
                        <TagList tags={postTransformed.tags} />
                    </div>

                    <div className="Post__bottom">
                        <div className="Post__likes">
                            <Like
                                postId={postTransformed.id}
                                count={postTransformed.likesCount}
                                isLiked={postTransformed.isLiked}
                            />
                        </div>
                        <div className="Post__date">
                            <time>{postTransformed.createTime}</time>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
