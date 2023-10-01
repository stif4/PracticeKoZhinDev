import React from 'react';
import CommentForm from '../../shared/Forms/CommentForm';
import {IPostTransformById} from '../../store/api/types';
import CommentList from './CommentList';
import './CommentBlock.scss';

interface ICommentBlockProps {
    post: IPostTransformById;
}

export default function CommentBlock({post}: ICommentBlockProps) {
    return (
        <div className="commentBlock">
            <div className="commentBlock__container">
                {Boolean(post.comments.length) && (
                    <div className='commentBlock__isShow'>
                        <div className="commentBlock__titleContainer">
                            <h2 className="commentBlock__title">Комментарии:</h2>
                        </div>
                        <div className="commentBlock__list">
                            <CommentList comments={post.comments} />
                        </div>
                    </div>
                )}
                <div className="commentBlock__form">
                    <CommentForm postId={post.id} />
                </div>
            </div>
        </div>
    );
}
