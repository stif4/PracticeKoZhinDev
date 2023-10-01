import React from 'react';
import {toast} from 'react-toastify';
import useFetchUserWithAwatar from '../../hooks/useFetchUserWithAwatar';
import {IComment} from '../../store/api/types';
import Avatar from '../Avatar';
import Card from '../Card';
import PopUp from '../Pop-up';
import {IItem} from '../types/types';
import './Comment.scss';
import {useDeleteCommentMutation} from '../../store/api/postApi';

interface ICommnetProps {
    comment: IComment;
}

export default function Comment({comment}: ICommnetProps) {
    const {user, avatar, isLoadingAvatar, isFetchingUser, isMe} = useFetchUserWithAwatar(comment.userId);

    const [deliteComment, {isSuccess: isSuccessDeliteComment, isError: isErrorDeliteComment}] = useDeleteCommentMutation();

    const handleDeliteComment = () => {
        deliteComment({postId: comment.postId, commentId: comment.id});
    };

    React.useEffect(() => {
        if (isSuccessDeliteComment) {
            toast('Коментарий удален', {type: 'success'});
        }
        if (isErrorDeliteComment) {
            toast('Коментарий удален', {type: 'error'});
        }
    }, [isSuccessDeliteComment, isErrorDeliteComment]);

    const items: IItem[] = [{text: 'Удалить комментарий', addClass: 'red', action: handleDeliteComment}];

    return (
        <div className="Comment">
            <Card padding="8px 16px 8px 14px">
                <div className="Comment__container">
                    <div className="Comment__avatar">
                        <Avatar
                            urlImg={avatar}
                            isLoading={isLoadingAvatar}
                            size={50}
                        />
                    </div>

                    <div className="Comment__main">
                        <div className="Comment__FIContainer">
                            <h3 className="Comment__FI">{`${user?.firstName} ${user?.lastName}`}</h3>
                        </div>
                        <div className="Commet__textContainer">
                            <p className="Comment__text">{comment.text}</p>
                        </div>
                    </div>
                    {isMe && (
                        <div className="Comment__menu">
                            <PopUp items={items} />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
